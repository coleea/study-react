import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

// 아톰. 아톰은 키와 값으로 이루어진 맵이다.
// 아톰은 상태를 나타내는 최소단위다
// 아톰은 스토어에 값을 저장할 수 있다
const textAtom = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

// 셀렉터. 셀렉터는 값을 저장할 수 없다.
// 셀렉터는 구독자다. get으로 구독한 값이 발행될 때 마다 값을 불러옴
const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get(textAtom);
      return text.length;
    },
  });

export default function CharacterCounter() {
    return (
      <div>
        <TextInput />
        <CharacterCount />
      </div>
    );
  }
  
  function TextInput() {

    const [텍스트, 텍스트설정] = useRecoilState(textAtom);

    const onChange = (event) => {
      텍스트설정(event.target.value);
    };
  
    return (
      <div>
        <input type="text" value={텍스트} onChange={onChange} />
        <br />
        Echo: {텍스트}
      </div>
    );
  }


  function CharacterCount() {
    const count = useRecoilValue(charCountState);
    return <>Character Count: {count}</>;
  }
