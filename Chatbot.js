import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you with farming today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('english');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      
      // Simple language-based responses for demonstration
      if (language === 'english') {
        botResponse = getBotResponse(input, 'english');
      } else if (language === 'hindi') {
        botResponse = getBotResponse(input, 'hindi');
      } else if (language === 'gujarati') {
        botResponse = getBotResponse(input, 'gujarati');
      }
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const getBotResponse = (input, lang) => {
    const lowerInput = input.toLowerCase();
    
    // Simple response logic based on keywords
    if (lang === 'english') {
      if (lowerInput.includes('weather')) {
        return 'You can check the latest weather forecast using our Weather Widget tool. It provides real-time data for your location.';
      } else if (lowerInput.includes('fertilizer') || lowerInput.includes('soil')) {
        return 'Our Soil Health Tool can help you determine the best fertilizers for your soil type. Would you like to try it?';
      } else if (lowerInput.includes('seed') || lowerInput.includes('plant')) {
        return 'We have a wide range of seeds available in our marketplace. You can filter by crop type and supplier.';
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        return 'You can find pricing information for all products in our marketplace section. We offer competitive rates from top suppliers.';
      } else {
        return 'I\'m here to help with any farming questions. You can ask about weather, soil health, seeds, tools, or browse our learning resources for more information.';
      }
    } else if (lang === 'hindi') {
      if (lowerInput.includes('weather') || lowerInput.includes('mausam')) {
        return 'आप हमारे वेदर विजेट टूल का उपयोग करके नवीनतम मौसम पूर्वानुमान देख सकते हैं। यह आपके स्थान के लिए रीयल-टाइम डेटा प्रदान करता है।';
      } else if (lowerInput.includes('fertilizer') || lowerInput.includes('khad') || lowerInput.includes('soil') || lowerInput.includes('mitti')) {
        return 'हमारा सॉइल हेल्थ टूल आपको आपके मिट्टी के प्रकार के लिए सबसे अच्छे उर्वरक निर्धारित करने में मदद कर सकता है। क्या आप इसे आजमाना चाहेंगे?';
      } else if (lowerInput.includes('seed') || lowerInput.includes('beej') || lowerInput.includes('plant') || lowerInput.includes('paudha')) {
        return 'हमारे मार्केटप्लेस में विभिन्न प्रकार के बीज उपलब्ध हैं। आप फसल प्रकार और आपूर्तिकर्ता द्वारा फ़िल्टर कर सकते हैं।';
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('daam') || lowerInput.includes('kimat')) {
        return 'आप हमारे मार्केटप्लेस सेक्शन में सभी उत्पादों के लिए मूल्य जानकारी पा सकते हैं। हम शीर्ष आपूर्तिकर्ताओं से प्रतिस्पर्धी दरें प्रदान करते हैं।';
      } else {
        return 'मैं किसी भी कृषि प्रश्न में मदद करने के लिए यहां हूं। आप मौसम, मिट्टी के स्वास्थ्य, बीज, उपकरण के बारे में पूछ सकते हैं, या अधिक जानकारी के लिए हमारे लर्निंग रिसोर्सेज ब्राउज़ कर सकते हैं।';
      }
    } else if (lang === 'gujarati') {
      if (lowerInput.includes('weather') || lowerInput.includes('havaman')) {
        return 'તમે અમારા વેધર વિજેટ ટૂલનો ઉપયોગ કરીને તાજેતરના હવામાન આગાહી તપાસી શકો છો. તે તમારા સ્થાન માટે રીયલ-ટાઇમ ડેટા પ્રદાન કરે છે.';
      } else if (lowerInput.includes('fertilizer') || lowerInput.includes('khatar') || lowerInput.includes('soil') || lowerInput.includes('mati')) {
        return 'અમારું સોઇલ હેલ્થ ટૂલ તમને તમારી માટીના પ્રકાર માટે શ્રેષ્ઠ ખાતર નક્કી કરવામાં મદદ કરી શકે છે. શું તમે તેને અજમાવવા માંગો છો?';
      } else if (lowerInput.includes('seed') || lowerInput.includes('bij') || lowerInput.includes('plant') || lowerInput.includes('chod')) {
        return 'અમારા માર્કેટપ્લેસમાં વિવિધ પ્રકારના બીજ ઉપલબ્ધ છે. તમે પાક પ્રકાર અને સપ્લાયર દ્વારા ફિલ્ટર કરી શકો છો.';
      } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('bhav') || lowerInput.includes('kimat')) {
        return 'તમે અમારા માર્કેટપ્લેસ વિભાગમાં બધા ઉત્પાદનો માટે કિંમતની માહિતી મેળવી શકો છો. અમે ટોચના સપ્લાયર્સ પાસેથી સ્પર્ધાત્મક દરો આપીએ છીએ.';
      } else {
        return 'હું કોઈપણ ખેતી પ્રશ્નોમાં મદદ કરવા માટે અહીં છું. તમે હવામાન, માટીના સ્વાસ્થ્ય, બીજ, સાધનો વિશે પૂછી શકો છો, અથવા વધુ માહિતી માટે અમારા લર્નિંગ રિસોર્સિસ બ્રાઉઝ કરી શકો છો.';
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Farming Assistant</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white text-primary text-sm rounded px-2 py-1"
        >
          <option value="english">English</option>
          <option value="hindi">हिन्दी</option>
          <option value="gujarati">ગુજરાતી</option>
        </select>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 ${
              message.sender === 'user' 
                ? 'text-right' 
                : 'text-left'
            }`}
          >
            <div 
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'english' 
                ? 'Type your question here...' 
                : language === 'hindi' 
                  ? 'अपना प्रश्न यहां टाइप करें...' 
                  : 'તમારો પ્રશ્ન અહીં ટાઇપ કરો...'
            }
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
