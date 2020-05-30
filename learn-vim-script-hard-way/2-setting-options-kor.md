# 셋팅 옵션

빔은 그것이 어떻게 행동할 것인지에 대한 많은 옵션을 갖고있다.

2개의 많이 사용되는 옵션: Boolean, take a value.

## Boolean 옵션

아래 커맨드를 실행해 보세요.

    :set nubmer

라인 숫자가 왼쪽에 생길 것 입니다.
이미 있었다면 아무것도 작동이 안될 것입니다. 아래 커맨드를 실행해보세요.

    :set nonumber

라인 넘버가 사라졌습니다. `number`는 boolean 옵션입니다. boolean 옵션은 켜거나(on) 끌 수(off) 있습니다.  `:set number`이 on, `:set nonumber` off 겠죠.

모든 boolean옵션은 이러한 방법으로 작동합니다. `set <name>` on, `set no<name>` off.

## 껏다키는 Boolean 옵션들

옵션이 켜져있든 꺼져있든 지금과 반대의 상황으로 토글 할 수 있습니다. 아래 명령어를 실행해보세요.

    :set number!

number 옵션이 지금과 반대의 상황으로 변한 것을 볼 수 있을 것입니다. 다시한번 실행해보세요.

## Value 옵션들

몇몇 옵션들을 On and Off 둘 중 하나가 아닌 특정한 값을 갖습니다. 아래 커맨들을 입력하고 뭐가 어떻게 되는지 지켜보세요.

    :set number
    :set numberwidth=10
    :set numberwidth=4
    :set numberwidth?

`numberwidth` 옵션이 뭘 하는지 짐작이 되실겁니다. 라인숫자의 넓이를 결정하는 옵션입니다. 이와 같이 값을 갖는 옵션들은 `:set <name>=<value>` 로 바꿀 수 있습니다. 그리고 `:set <name>?`으로 현재의 값을 확인 할 수도 있습니다.

다른 옵션들이 어떤 값으로 설정되어 있는지 확인해보세요.

    :set wrap?
    :set shiftround?
    :set matchtime?

## 한번에 여러 옵션 변경하기

마지막으로 하나이상의 옵션을 `:set` 한번으로 바꾸는것을 알려드리겠습니다. 아래 커맨드를 입력해보세요.

    :set numberwidth=2
    :set nonumber
    :set number numberwidth=6

마지막 명령어가 어떤 효과가 있는지 아시겠죠?

## 연습

아래 명령어들을 읽어보세요.

`:help 'number'`

`:help relativenumber`

`:help numberwidth`

`:help wrap`

`:help matchtime`

그리고 몇 줄을 여러분의 `.vimrc`파일에 추가해서 당신이 좋아하는 값들로 위 옵션들을 설정하세요.
