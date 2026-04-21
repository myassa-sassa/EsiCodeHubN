import LeftPanel from '../components/leftPanel';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';        // ← OU CE CI


export default function LoginPage() {
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkStatus, setMagicLinkStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ← AJOUTER CETTE FONCTION
  const sendMagicLink = async () => {    if (!magicLinkEmail) {
      setMagicLinkStatus('Veuillez entrer votre email');
      return;
    }

    setIsLoading(true);
    setMagicLinkStatus('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/api/auth/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magicLinkEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setMagicLinkStatus('✅ Lien magique envoyé ! Vérifiez votre boîte mail.');
        setMagicLinkEmail('');
        setTimeout(() => setShowMagicLink(false), 3000);
      } else {
        setMagicLinkStatus('❌ ' + (data.message || 'Email non trouvé'));
      }
    } catch (error) {
      setMagicLinkStatus('❌ Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    
    <div style={{
       minHeight: "100vh",
      background:"#ffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      boxSizing: "border-box",
    }}>
        <div style={{
           width: "100%",
        maxWidth: "1100px",
        background: "#FFFFFF",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        minHeight: "600px",
        background: "linear-gradient(135deg, #F0F4F8 0%, #D9E2EC 100%)",
      }}>
          <LeftPanel />
          <LoginForm />
        </div>
    </div>
  );
}