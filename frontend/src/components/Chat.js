import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // Estado para exibir "Carregando..."

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setLoading(true); // Ativa "Carregando..."

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: input,
                sessionId: '12345',
            });

            const botMessage = { role: 'bot', content: response.data.response };

            setMessages((prevMessages) => [...prevMessages, botMessage]); // Atualiza corretamente
        } catch (error) {
            console.error('❌ Erro ao enviar mensagem:', error);
        }

        setInput('');
        setLoading(false); // Desativa "Carregando..."
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Chatbot</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}>
                {messages.map((msg, index) => (
                    <p key={index} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
                        {msg.role === 'user' ? 'Você: ' : 'Bot: '}
                        {msg.content}
                    </p>
                ))}
                {loading && <p>Carregando...</p>} {/* Mostra enquanto aguarda resposta */}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '80%', padding: '10px', marginTop: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>
                Enviar
            </button>
        </div>
    );
};

export default Chat;