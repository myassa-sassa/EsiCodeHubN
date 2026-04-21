// components/MagicLinkLogin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MagicLinkLogin = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Récupérer le token et l'email depuis l'URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Lien invalide. Veuillez demander un nouveau lien.');
      return;
    }

    // Vérifier le magic link avec le backend
    const verifyMagicLink = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/verify-magic-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email: decodeURIComponent(email) }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Sauvegarder les informations utilisateur
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          setStatus('success');
          setMessage('Connexion réussie ! Redirection...');
          
          // Rediriger vers le dashboard après 2 secondes
          setTimeout(() => {
            // navigate('/dashboard');
navigate('/student/dashboard');

          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Lien invalide ou expiré');
          
          // Rediriger vers login après 3 secondes
          setTimeout(() => {
            // navigate('/login');
                navigate('/student');

          }, 3000);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setStatus('error');
        setMessage('Erreur de connexion au serveur');
        
        setTimeout(() => {
          // navigate('/login');
                navigate('/student');
        }, 3000);
      }
    };

    verifyMagicLink();
  }, [location, navigate]);

  // Styles CSS (vous pouvez les mettre dans un fichier séparé)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {status === 'verifying' && (
          <>
            <div style={styles.spinner}></div>
            <h2>Vérification en cours...</h2>
            <p>Veuillez patienter pendant que nous vérifions votre lien.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>Connexion réussie !</h2>
            <p>{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div style={styles.errorIcon}>❌</div>
            <h2 style={styles.errorTitle}>Erreur de connexion</h2>
            <p>{message}</p>
            <button 
              onClick={() => navigate('/student')}
              style={styles.button}
            >
              Retour à la page de connexion
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #4F46E5',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  successTitle: {
    color: '#10B981',
    marginBottom: '10px',
  },
  errorTitle: {
    color: '#EF4444',
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

// Ajouter l'animation CSS pour le spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default MagicLinkLogin;