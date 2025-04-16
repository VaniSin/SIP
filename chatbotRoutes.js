const express = require('express');
const router = express.Router();

// Mock chatbot responses for different languages
const responses = {
  english: {
    greetings: ['Hello!', 'Hi there!', 'Welcome to Grow Smart!'],
    farming: [
      'For sustainable farming practices, consider crop rotation and natural pest control methods.',
      'Organic farming can improve soil health and reduce environmental impact.',
      'Precision agriculture technologies can help optimize water and fertilizer usage.'
    ],
    weather: [
      'You can check the latest weather forecast in our Weather Widget.',
      'Weather patterns are important for planning your farming activities.',
      'Consider installing a rain gauge to track local precipitation.'
    ],
    soil: [
      'Regular soil testing is essential for maintaining optimal soil health.',
      'Our Soil Health Tool can provide personalized recommendations for your soil type.',
      'Cover crops can help improve soil structure and fertility.'
    ],
    tools: [
      'We offer a wide range of farming tools from trusted suppliers.',
      'The right tools can significantly improve your farming efficiency.',
      'Check our marketplace for the latest farming equipment.'
    ],
    default: [
      'I\'m here to help with your farming questions. Feel free to ask about weather, soil health, tools, or farming practices.',
      'You can browse our learning resources for more detailed information on various farming topics.',
      'Is there something specific about farming you\'d like to know?'
    ]
  },
  hindi: {
    greetings: ['नमस्ते!', 'आपका स्वागत है!', 'ग्रो स्मार्ट में आपका स्वागत है!'],
    farming: [
      'टिकाऊ खेती के लिए, फसल चक्र और प्राकृतिक कीट नियंत्रण विधियों पर विचार करें।',
      'जैविक खेती मिट्टी के स्वास्थ्य को बेहतर बना सकती है और पर्यावरणीय प्रभाव को कम कर सकती है।',
      'सटीक कृषि प्रौद्योगिकियां पानी और उर्वरक के उपयोग को अनुकूलित करने में मदद कर सकती हैं।'
    ],
    weather: [
      'आप हमारे वेदर विजेट में नवीनतम मौसम पूर्वानुमान देख सकते हैं।',
      'मौसम पैटर्न आपकी कृषि गतिविधियों की योजना बनाने के लिए महत्वपूर्ण हैं।',
      'स्थानीय वर्षा को ट्रैक करने के लिए एक रेन गेज स्थापित करने पर विचार करें।'
    ],
    soil: [
      'इष्टतम मिट्टी के स्वास्थ्य को बनाए रखने के लिए नियमित मिट्टी परीक्षण आवश्यक है।',
      'हमारा सॉइल हेल्थ टूल आपके मिट्टी के प्रकार के लिए व्यक्तिगत सिफारिशें प्रदान कर सकता है।',
      'कवर क्रॉप्स मिट्टी की संरचना और उर्वरता में सुधार कर सकते हैं।'
    ],
    tools: [
      'हम विश्वसनीय आपूर्तिकर्ताओं से कृषि उपकरणों की एक विस्तृत श्रृंखला प्रदान करते हैं।',
      'सही उपकरण आपकी खेती की दक्षता में काफी सुधार कर सकते हैं।',
      'नवीनतम कृषि उपकरणों के लिए हमारे मार्केटप्लेस देखें।'
    ],
    default: [
      'मैं आपके कृषि प्रश्नों में मदद करने के लिए यहां हूं। मौसम, मिट्टी के स्वास्थ्य, उपकरण, या खेती के तरीकों के बारे में पूछने के लिए स्वतंत्र महसूस करें।',
      'आप विभिन्न कृषि विषयों पर अधिक विस्तृत जानकारी के लिए हमारे लर्निंग रिसोर्सेज ब्राउज़ कर सकते हैं।',
      'क्या खेती के बारे में कुछ विशेष है जो आप जानना चाहते हैं?'
    ]
  },
  gujarati: {
    greetings: ['નમસ્તે!', 'આપનું સ્વાગત છે!', 'ગ્રો સ્માર્ટમાં આપનું સ્વાગત છે!'],
    farming: [
      'ટકાઉ ખેતી માટે, પાક ફેરબદલી અને કુદરતી જીવાત નિયંત્રણ પદ્ધતિઓ પર વિચાર કરો.',
      'જૈવિક ખેતી માટીના સ્વાસ્થ્યમાં સુધારો કરી શકે છે અને પર્યાવરણીય અસરને ઘટાડી શકે છે.',
      'ચોક્કસ કૃષિ ટેકનોલોજી પાણી અને ખાતરના ઉપયોગને અનુકૂળ બનાવવામાં મદદ કરી શકે છે.'
    ],
    weather: [
      'તમે અમારા વેધર વિજેટમાં તાજેતરના હવામાન આગાહી તપાસી શકો છો.',
      'હવામાન પેટર્ન તમારી ખેતીની પ્રવૃત્તિઓની યોજના બનાવવા માટે મહત્વપૂર્ણ છે.',
      'સ્થાનિક વરસાદને ટ્રેક કરવા માટે રેઇન ગેજ સ્થાપિત કરવાનું વિચારો.'
    ],
    soil: [
      'શ્રેષ્ઠ માટીના સ્વાસ્થ્યને જાળવવા માટે નિયમિત માટી પરીક્ષણ આવશ્યક છે.',
      'અમારું સોઇલ હેલ્થ ટૂલ તમારી માટીના પ્રકાર માટે વ્યક્તિગત ભલામણો પ્રદાન કરી શકે છે.',
      'કવર ક્રોપ્સ માટીની રચના અને ફળદ્રુપતામાં સુધારો કરવામાં મદદ કરી શકે છે.'
    ],
    tools: [
      'અમે વિશ્વસનીય સપ્લાયર્સ પાસેથી ખેતીના સાધનોની વિશાળ શ્રેણી પ્રદાન કરીએ છીએ.',
      'યોગ્ય સાધનો તમારી ખેતીની કાર્યક્ષમતામાં નોંધપાત્ર સુધારો કરી શકે છે.',
      'નવીનતમ ખેતીના સાધનો માટે અમારું માર્કેટપ્લેસ તપાસો.'
    ],
    default: [
      'હું તમારા ખેતીના પ્રશ્નોમાં મદદ કરવા માટે અહીં છું. હવામાન, માટીના સ્વાસ્થ્ય, સાધનો, અથવા ખેતીની પદ્ધતિઓ વિશે પૂછવા માટે મુક્ત અનુભવો.',
      'તમે વિવિધ ખેતી વિષયો પર વધુ વિગતવાર માહિતી માટે અમારા લર્નિંગ રિસોર્સિસ બ્રાઉઝ કરી શકો છો.',
      'શું ખેતી વિશે કંઈક ચોક્કસ છે જે તમે જાણવા માંગો છો?'
    ]
  }
};

// @desc    Get chatbot response
// @route   POST /api/chatbot/message
// @access  Public
const getChatbotResponse = async (req, res) => {
  try {
    const { message, language = 'english' } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Please provide a message' });
    }
    
    // Simple keyword-based response logic
    const lowerMessage = message.toLowerCase();
    let responseCategory = 'default';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      responseCategory = 'greetings';
    } else if (lowerMessage.includes('farm') || lowerMessage.includes('crop') || lowerMessage.includes('organic')) {
      responseCategory = 'farming';
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('forecast')) {
      responseCategory = 'weather';
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
      responseCategory = 'soil';
    } else if (lowerMessage.includes('tool') || lowerMessage.includes('equipment') || lowerMessage.includes('machine')) {
      responseCategory = 'tools';
    }
    
    // Get responses for the selected language and category
    const languageResponses = responses[language] || responses.english;
    const categoryResponses = languageResponses[responseCategory] || languageResponses.default;
    
    // Select a random response from the category
    const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Routes
router.post('/message', getChatbotResponse);

module.exports = router;
