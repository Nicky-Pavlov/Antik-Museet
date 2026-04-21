import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import argumentBg from '../assets/fight assets/argument scene/argument background.png';
import hitGirl1 from '../assets/fight assets/argument scene/hit girl 1.png';
import hitGirl2 from '../assets/fight assets/argument scene/hit girl 2.png';
import frameBubble1 from '../assets/fight assets/argument scene/frame bubble 1.png';
import frameBubble2 from '../assets/fight assets/argument scene/frame bubble 2.png';

const dialogueLines = [
  { speaker: 'Girl 1', speakerId: 'girl1', text: 'Hey did you hear they are getting rid of some statues to make room for new ones. Thats outrageus!' },
  { speaker: 'Girl 2', speakerId: 'girl2', text: 'No way ! Well at least I am safe I don\'t think they would ever get rid of me.' },
  { speaker: 'Girl 1', speakerId: 'girl1', text: 'How can you be so sure? What makes you think that?' },
  { speaker: 'Girl 2', speakerId: 'girl2', text: 'I am clearly the most talented statue in this museum. It is only fair they keep me.' },
  { speaker: 'Girl 1', speakerId: 'girl1', text: 'I don\'t believe it! How exactly are you talented?' },
  { speaker: 'Girl 2', speakerId: 'girl2', text: 'I will prove to you that I\'m talented!' },
  { speaker: 'Girl 1', speakerId: 'girl1', text: 'Oh yeah? How?' },
  { speaker: 'Girl 2', speakerId: 'girl2', text: 'In a DUEL!' },
  { speaker: 'Girl 1', speakerId: 'girl1', text: 'I accept!!!' },
];

function TheDuel() {
  const [lineIndex, setLineIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const advanceDialogue = () => {
    if (isTransitioning) {
      return;
    }

    setLineIndex((currentIndex) => {
      if (currentIndex >= dialogueLines.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          navigate('/fight-scene');
        }, 700);
        return currentIndex;
      }

      return currentIndex + 1;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      advanceDialogue();
    }
  };

  const currentLine = dialogueLines[lineIndex];
  const activeBubble = currentLine.speakerId === 'girl2' ? frameBubble2 : frameBubble1;
  const bubbleLeft = currentLine.speakerId === 'girl2' ? '53%' : '47%';

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${argumentBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      cursor: isTransitioning ? 'default' : 'pointer',
    }}
    onClick={advanceDialogue}
    onKeyDown={handleKeyDown}
    role="button"
    tabIndex={0}
    aria-label="Advance dialogue"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          navigate('/');
        }}
        style={{
          position: 'absolute',
          top: '2.5%',
          left: '2%',
          zIndex: 20,
          border: 'none',
          borderRadius: '999px',
          padding: '0.55rem 1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.62)',
          color: '#f7e9d5',
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          cursor: 'pointer',
        }}
      >
        Back to Main
      </button>

      {/* Hit Girl 1 - Left */}
      <img
        src={hitGirl1}
        alt="Hit Girl 1"
        style={{
          position: 'absolute',
          bottom: '-6%',
          left: '2%',
          height: '96%',
          objectFit: 'contain',
          objectPosition: 'bottom',
        }}
      />

      {/* Frame Bubble - Centre */}
      <img
        src={activeBubble}
        alt="Speech Bubble"
        style={{
          position: 'absolute',
          top: '50%',
          left: bubbleLeft,
          transform: 'translate(-50%, -50%)',
          width: '40%',
          maxWidth: '680px',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '54%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '46%',
          maxWidth: '780px',
          aspectRatio: '16 / 11',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '16% 14% 22%',
          boxSizing: 'border-box',
          color: '#2c1f13',
          textShadow: '0 1px 0 rgba(255, 255, 255, 0.45)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'Papyrus, fantasy',
            fontSize: 'clamp(0.65rem, 1.7vw, 2.2rem)',
            lineHeight: 1.35,
          }}
        >
          {currentLine.text}
        </p>
      </div>

      {/* Hit Girl 2 - Right */}
      <img
        src={hitGirl2}
        alt="Hit Girl 2"
        style={{
          position: 'absolute',
          bottom: '-6%',
          right: '2%',
          height: '96%',
          objectFit: 'contain',
          objectPosition: 'bottom',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: isTransitioning ? 1 : 0,
          transition: 'opacity 700ms ease-in-out',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default TheDuel;
