import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../css/end.module.css';
import { useNavigate } from 'react-router-dom';
const End = () => {
    const navigate = useNavigate();
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
    const location = useLocation();
    const { answer } = location.state || {};  // 전달받은 answer 값 사용

    const GoHome = () =>{
        
        navigate('/'); 
    }
    return (
        <>
        <section id="bg" className={styles.bg} style={backgroundStyle}>
            <h1>게임 종료</h1>
            <p>정답을 맞춘 횟수: {answer}</p>
            <div className={styles.btn} onClick={() => GoHome()}>다시하기</div>
        </section>
        </>
    );
};

export default End;