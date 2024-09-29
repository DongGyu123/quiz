import React, {  useEffect, useState, useRef } from 'react';
import styles from '../css/main.module.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [blendAmount] = useState(70);
  const [delay] = useState(-10);
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: 'linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)',
  });

  const navigate = useNavigate();

  const handleNavigateToGame = () => {
    navigate('/quiz'); 
  };

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

  return (
    <section id="bg" className={styles.bg} style={backgroundStyle}>
      <h1 className={styles.h1}>
        지냥이 퀴즈
      </h1>
      <div className={styles.btn} onClick={handleNavigateToGame}>게임 시작</div>
    </section>
  );
};

export default Main;