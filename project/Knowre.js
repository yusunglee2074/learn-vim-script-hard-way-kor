var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./db_init.js'),
    app = express();

//TODO: 이 부분을 완성해 주세요..!
function Cache () {
    let _data = {};

    this.put = function (key, value, time) {
        let item = {
            value,
            expireTime: Date.now() + time,
        };
        _data[key] = item;
    };

    this.get = function (key) {
        let data = _data[key];
        if (typeof data !== "undefined") {
            if (data.expireTime >= Date.now()) {
                return data.value
            } else {
                delete _data[key];
            }
        }
        return null;
    }
}
const cache = new Cache();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ? res.sendStatus(200) : next();
};
app.use(allowCORS);

app.get('/api/fetchProblem', function(req, res, next) {
    let problems = cache.get('problems');
    let cacheMinutes = 1;

    if (problems) {
        res.json({ problems });
    } else {
        db.Problem.findAll({
            attributes: ['id', 'problem_text', 'type', 'choices']
        })
            .then(problems => {
                cache.put('problems', problems, cacheMinutes * 60 * 1000);
                res.json({ problems });
            })
            .catch(next);
    }
});

app.post('/api/submit', function(req, res, next) {
    let userInput = JSON.parse(req.body.input);

    if (userInput.length !== 15) {
        throw new Error('Number of answer should be 15')
    }
    userInput.sort((a, b) => {
        return a['id'] - b['id'];
    });
    let promiseList = [];

    db.Problem.findAll({
        attributes: ['id', 'answer'],
        order: [['id']]
    })
        .then(problems => {
            for (let i = 0; i < problems.length; i++) {
                // 주관식 문제는 숫자만 빼서 비교
                if (11 <= problems[i].id && problems[i].id <= 13) {
                    let problemAnswer = getOnlyNumbers(userInput[i].answer);
                    let userAnswer = getOnlyNumbers(problems[i].answer);
                    if (problemAnswer === userAnswer) {
                        userInput[i].answer = problems[i].answer
                    }
                }

                if (problems[i].answer === userInput[i].answer || problems[i].id >= 14) {
                    promiseList.push(db.Result.create({
                        problem_id: userInput[i].id,
                        answer: problems[i].answer,
                        result: 1
                    }));
                } else {
                    promiseList.push(db.Result.create({
                        problem_id: userInput[i].id,
                        answer: problems[i].answer,
                        result: 0
                    }));
                }
            }

            return Promise.all(promiseList);
        })
        .then(() => {
            return db.Result.findAll({
                attributes: [['problem_id', 'id'], 'result', 'answer'],
                order: [['id']]
            });
        })
        .then(results => {
            res.json({ results });
        })
        .catch(next);
});

app.use(function (error, req, res) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
});



function getOnlyNumbers (str) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i]) && str[i] !== ' ') result += str[i];
    }
    return result;
}

var server = app.listen(3000, function() {
    console.log('Server started');
});
