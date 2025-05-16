import React, { useEffect, useState } from 'react';

const BotpressChat = () => {
  const [botReady, setBotReady] = useState(false);

  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
    injectScript.async = true;

    injectScript.onload = () => {
      const botScript = document.createElement('script');
      botScript.src = 'https://files.bpcontent.cloud/2025/05/09/09/20250509090315-7278RMKB.js';
      botScript.async = true;

      botScript.onload = () => {
        setBotReady(true); // now it's safe to use window.botpressWebChat
      };

      document.body.appendChild(botScript);
    };

    document.body.appendChild(injectScript);

    return () => {
      document.body.removeChild(injectScript);
      const botScriptElem = document.querySelector('script[src*="bpcontent"]');
      if (botScriptElem) document.body.removeChild(botScriptElem);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          if (window.botpressWebChat) {
            window.botpressWebChat.toggle();
          } else {
            alert("Chat is still loading, please try again shortly.");
          }
        }}
        disabled={!botReady}
      >
        Chat with AI
      </button>
    </div>
  );
};

export default BotpressChat;

    