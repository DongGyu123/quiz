import React, {  useEffect, useState, useRef } from 'react';
import styles from '../css/quiz.module.css';
import { useNavigate } from 'react-router-dom';
const cat_list=[
    '뚱냥이_1.jpg', '뚱냥이_2.jpg', '뚱냥이_3.jpg', '뚱냥이_4.jpg', '뚱냥이_5.jpg',
    '뚱냥이_fake_1.jpg', '뚱냥이_fake_2.jpg', '뚱냥이_fake_3.jpg', '뚱냥이_fake_4.jpg', '뚱냥이_fake_5.jpg',
    '고등어_1.jpg', '고등어_2.jpg', '고등어_3.jpg', '고등어_4.jpg', '고등어_5.jpg',
    '고등어_fake_1.jpg', '고등어_fake_2.jpg', '고등어_fake_3.jpg', '고등어_fake_4.jpg', '고등어_fake_5.jpg',
    '깨_1.jpg', '깨_2.jpg', '깨_3.jpg', '깨_4.jpg', '깨_5.jpg',
    '깨_fake_1.jpg', '깨_fake_2.jpg', '깨_fake_3.jpg', '깨_fake_4.jpg', '깨_fake_5.jpg',
    '찰_1.jpg', '찰_2.jpg', '찰_3.jpg', '찰_4.jpg', '찰_5.jpg',
    '찰_fake_1.jpg', '찰_fake_2.jpg', '찰_fake_3.jpg', '찰_fake_4.jpg', '찰_fake_5.jpg',
    '올리브_1.jpg', '올리브_2.jpg', '올리브_3.jpg', '올리브_4.jpg', '올리브_5.jpg',
    '올리브_fake_1.jpg', '올리브_fake_2.jpg', '올리브_fake_3.jpg', '올리브_fake_4.jpg', '올리브_fake_5.jpg',
    '오뎅_1.jpg', '오뎅_2.jpg', '오뎅_3.jpg', '오뎅_4.jpg', '오뎅_5.jpg',
    '오뎅_fake_1.jpg', '오뎅_fake_2.jpg', '오뎅_fake_3.jpg', '오뎅_fake_4.jpg', '오뎅_fake_5.jpg',
    '햄토리_1.jpg', '햄토리_2.jpg', '햄토리_3.jpg', '햄토리_4.jpg', '햄토리_5.jpg',
    '햄토리_fake_1.jpg', '햄토리_fake_2.jpg', '햄토리_fake_3.jpg', '햄토리_fake_4.jpg', '햄토리_fake_5.jpg',
    '종이_1.jpg', '종이_2.jpg', '종이_3.jpg', '종이_4.jpg', '종이_5.jpg',
    '종이_fake_1.jpg', '종이_fake_2.jpg', '종이_fake_3.jpg', '종이_fake_4.jpg', '종이_fake_5.jpg',
    '우유_1.jpg', '우유_2.jpg', '우유_3.jpg', '우유_4.jpg', '우유_5.jpg',
    '우유_fake_1.jpg', '우유_fake_2.jpg', '우유_fake_3.jpg', '우유_fake_4.jpg', '우유_fake_5.jpg', 
    '라떼_1.jpg', '라떼_2.jpg', '라떼_3.jpg', '라떼_4.jpg', '라떼_5.jpg',
    '라떼_fake_1.jpg', '라떼_fake_2.jpg', '라떼_fake_3.jpg', '라떼_fake_4.jpg', '라떼_fake_5.jpg'
  ]
const cats=['뚱냥이', '고등어', '깨', '찰', '올리브', '오뎅', '햄토리', '종이', '우유', '라떼'];
const randomInt = Math.floor(Math.random() * 10);
const maincat=cats[randomInt]

const filteredCatList = cat_list.filter(cat => cat.includes(maincat) && !cat.includes('fake'));
const fakedCatList = cat_list.filter(cat => cat.includes(maincat) && cat.includes('fake'));

const firstcat = filteredCatList[Math.floor(Math.random() * filteredCatList.length)];

const Opening = ({ onStart }) => {
    const firstcatImage = `${process.env.PUBLIC_URL}/resources/${firstcat}`;
    const description = (
        <>
            안녕하세요~ 저는 {firstcat.split('_')[0]} 입니당.
            <br />
            이제부터 5번의 게임 동안 4개의 고양이 사진들 중에서 <br />
            제가 있는지 없는지, 있다면 누구인지를 찾아주세요!
            <br />
            4번 이상 정답을 맞히면 통과입니다!
        </>
    );
    return (
        <>
            <div>
                <img src={firstcatImage} className={styles.img_small} />
                <p className={styles.description}>{description}</p>
                <div className={styles.btn} onClick={onStart}>스타트!</div>
            </div>
        </>
    );
};

const Game = ({ gameNumber }) => {
    const navigate = useNavigate();
    const [gameList, setGameList] = useState([]);
    const [answer, setanswer] = useState(0);
    const [usedCat, setUsedCat] = useState([]);
    const [gameCount, setgameCount]= useState(gameNumber);
    const [canChoose, setCanChoose] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false); 

    useEffect(() => {
        const shuffleArray = (array) => {
            return array.sort(() => Math.random() - 0.5);
        };

        if (gameCount === 1) {
            let newGameList = [firstcat];
            const remainingCats = cat_list.filter(
                cat => !filteredCatList.includes(cat) && !fakedCatList.includes(cat)
            );

            const randomCats = shuffleArray(remainingCats).slice(0, 3);
            newGameList = [...newGameList, ...randomCats];
            setGameList(newGameList);
            setUsedCat(prevUsedCats => [...prevUsedCats, ...newGameList]);

        } else {
            setGameList([]);
            const remainingFilteredCats = filteredCatList.filter(cat => !usedCat.includes(cat));
            const randomFilteredCat = remainingFilteredCats.length > 0
                ? remainingFilteredCats[Math.floor(Math.random() * remainingFilteredCats.length)]
                : null;
                const remainingFakeCats = fakedCatList.filter(cat => !usedCat.includes(cat));
                const randomFakeCat = remainingFakeCats.length > 0
                    ? remainingFakeCats[Math.floor(Math.random() * remainingFakeCats.length)]
                    : null;

            let newGameList = [];
            if (randomFilteredCat) {
                newGameList.push(randomFilteredCat);
            }
            if (randomFakeCat) {
                newGameList.push(randomFakeCat);
            }
            const remainingCats = cat_list.filter(cat => !usedCat.includes(cat));
            const randomCats = shuffleArray(remainingCats).slice(0, 2);
            newGameList = [...newGameList, ...randomCats];
            newGameList = shuffleArray(newGameList);
            setGameList(newGameList);
            setUsedCat(prevUsedCats => [...prevUsedCats, ...newGameList]);
            if (gameCount > 5) {
                navigate('/end', { state: { answer } }); 
            }
        }
        setCanChoose(true);
    }, [gameCount]);

    const Answer = (firstcat, name) =>{
        if (canChoose === true) {
            setCanChoose(false);
            if (firstcat.split('_')[0] === name.split('_')[0] && !name.includes('fake')){
            setanswer(answer+1)
            setMessage('정답');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 1000);
            }else{
                setMessage('오답');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 1000);
            }
        setgameCount(gameCount+1)
        
    }}


    return (
        <div>
            <h3>{gameCount}번째 퀴즈</h3>
            <div className={styles.gameContainer}>
                {gameList.map((cat, index) => (
                    <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/resources/${cat}`}
                        className={styles[`gameimg${index+1}`]}
                        onClick={() => Answer(firstcat, cat)}
                    />
                ))}
            </div>
            {showMessage && (
                <div className={styles.message}>
                    {message}
                </div>
            )}
        </div>
    );
};

const Quiz = () =>{
    const [isOpening, setIsOpening] = useState(true); 
    const [blendAmount] = useState(70);
    const [delay] = useState(-10);
    const [backgroundStyle, setBackgroundStyle] = useState({
      background: 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)',
    });
    
    useEffect(() => {
      const handleMouseMove = (e) => {
        const windowWidth = window.innerWidth;
        const mouseX = Math.round((e.pageX / windowWidth) * 100 - delay);
  
        const col1 = mouseX - blendAmount;
        const col2 = mouseX + blendAmount;
  
        setBackgroundStyle({
          background: `linear-gradient(to right, #ffc3a0 ${col1}%, #ffafbd ${col2}%)`,
        });
      };
  
      document.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [blendAmount, delay]);

    const startGame = () => {
        setIsOpening(false); 
    };

    return (
        <>
            <section id="bg" className={styles.bg} style={backgroundStyle}>
                {isOpening ? <Opening onStart={startGame} /> : <Game gameNumber={1}/>}
            </section>
        </>
    );
}

export default Quiz;