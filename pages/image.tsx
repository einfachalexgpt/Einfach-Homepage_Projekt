import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Container from 'components/Container';

const NeueSeite2: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const iframe = document.getElementById('themeChangerFrame') as HTMLIFrameElement;

    if (iframe) {
      iframe.contentWindow!.postMessage({ theme: theme }, '*');
    }
  }, [theme]);

  return (
    <Container>
  <iframe
    id="themeChangerFrame"
    title="Beschreibung des Inhalts"  // Füge hier eine kurze Beschreibung hinzu
    src="https://togetherai-einfachllamistral.hf.space"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      border: 0
    }}>
  </iframe>
</Container>

  );
};

export default NeueSeite2;
