const express = require('express');
const router = express.Router();

// @desc    Analyze soil health and provide recommendations
// @route   POST /api/soil-health/analyze
// @access  Public
const analyzeSoilHealth = async (req, res) => {
  try {
    const { ph, nitrogen, phosphorus, potassium, organicMatter, soilType } = req.body;
    
    // Validate input parameters
    if (!ph || !nitrogen || !phosphorus || !potassium || !organicMatter || !soilType) {
      return res.status(400).json({ message: 'Please provide all required soil parameters' });
    }
    
    // Convert string values to numbers if needed
    const phValue = parseFloat(ph);
    const nValue = parseFloat(nitrogen);
    const pValue = parseFloat(phosphorus);
    const kValue = parseFloat(potassium);
    const omValue = parseFloat(organicMatter);
    
    // Validate parameter ranges
    if (phValue < 0 || phValue > 14) {
      return res.status(400).json({ message: 'pH value must be between 0 and 14' });
    }
    
    if (nValue < 0 || pValue < 0 || kValue < 0 || omValue < 0) {
      return res.status(400).json({ message: 'Nutrient values cannot be negative' });
    }
    
    // Generate recommendations based on soil parameters
    const recommendations = generateSoilRecommendations(phValue, nValue, pValue, kValue, omValue, soilType);
    
    res.json({
      success: true,
      soilParameters: {
        ph: phValue,
        nitrogen: nValue,
        phosphorus: pValue,
        potassium: kValue,
        organicMatter: omValue,
        soilType
      },
      recommendations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to generate soil recommendations
const generateSoilRecommendations = (ph, nitrogen, phosphorus, potassium, organicMatter, soilType) => {
  const fertilizers = [];
  const coverCrops = [];
  const practices = [];
  const crops = [];
  
  // pH recommendations
  if (ph < 6.0) {
    fertilizers.push('Agricultural lime to increase soil pH');
    practices.push('Apply lime at least 2-3 months before planting');
  } else if (ph > 7.5) {
    fertilizers.push('Sulfur or gypsum to decrease soil pH');
    practices.push('Split application of acidifying amendments over time');
  }
  
  // Nitrogen recommendations
  if (nitrogen < 40) {
    fertilizers.push('Urea or ammonium sulfate for nitrogen deficiency');
    coverCrops.push('Legumes like clover or alfalfa to fix nitrogen');
  } else if (nitrogen > 80) {
    practices.push('Reduce nitrogen application, risk of leaching');
    coverCrops.push('Non-legume cover crops like rye or oats to absorb excess nitrogen');
  }
  
  // Phosphorus recommendations
  if (phosphorus < 20) {
    fertilizers.push('Superphosphate or rock phosphate');
    practices.push('Band application of phosphorus near plant roots');
  } else if (phosphorus > 50) {
    practices.push('Avoid additional phosphorus application');
    practices.push('Implement buffer strips to prevent phosphorus runoff');
  }
  
  // Potassium recommendations
  if (potassium < 150) {
    fertilizers.push('Potassium chloride or potassium sulfate');
  } else if (potassium > 300) {
    practices.push('Reduce potassium application');
  }
  
  // Organic matter recommendations
  if (organicMatter < 3) {
    practices.push('Add compost or well-rotted manure');
    coverCrops.push('High biomass cover crops like sorghum-sudangrass');
    practices.push('Minimize tillage to preserve soil organic matter');
  }
  
  // Soil type specific recommendations
  switch(soilType) {
    case 'sandy':
      practices.push('Frequent, light irrigation');
      practices.push('Add organic matter to improve water retention');
      crops.push('Drought-tolerant crops like millets and sorghum');
      break;
    case 'clay':
      practices.push('Improve drainage');
      practices.push('Add gypsum to improve soil structure');
      coverCrops.push('Deep-rooted cover crops like daikon radish to break up clay');
      crops.push('Crops that tolerate wet conditions like rice and certain vegetables');
      break;
    case 'loam':
      practices.push('Maintain current soil structure with minimal tillage');
      crops.push('Most crops perform well in loamy soil');
      break;
    case 'silt':
      practices.push('Prevent compaction by limiting traffic when wet');
      practices.push('Add organic matter to improve aggregation');
      crops.push('Crops with moderate water requirements');
      break;
    default:
      break;
  }
  
  // Overall soil health score (simple calculation for demo)
  let soilHealthScore = 0;
  
  // pH factor (optimal range 6.0-7.0)
  if (ph >= 6.0 && ph <= 7.0) {
    soilHealthScore += 20;
  } else if (ph >= 5.5 && ph < 6.0 || ph > 7.0 && ph <= 7.5) {
    soilHealthScore += 15;
  } else {
    soilHealthScore += 10;
  }
  
  // Nitrogen factor
  if (nitrogen >= 40 && nitrogen <= 80) {
    soilHealthScore += 20;
  } else if (nitrogen >= 20 && nitrogen < 40 || nitrogen > 80 && nitrogen <= 100) {
    soilHealthScore += 15;
  } else {
    soilHealthScore += 10;
  }
  
  // Phosphorus factor
  if (phosphorus >= 20 && phosphorus <= 50) {
    soilHealthScore += 20;
  } else if (phosphorus >= 10 && phosphorus < 20 || phosphorus > 50 && phosphorus <= 70) {
    soilHealthScore += 15;
  } else {
    soilHealthScore += 10;
  }
  
  // Potassium factor
  if (potassium >= 150 && potassium <= 300) {
    soilHealthScore += 20;
  } else if (potassium >= 100 && potassium < 150 || potassium > 300 && potassium <= 350) {
    soilHealthScore += 15;
  } else {
    soilHealthScore += 10;
  }
  
  // Organic matter factor
  if (organicMatter >= 3) {
    soilHealthScore += 20;
  } else if (organicMatter >= 2 && organicMatter < 3) {
    soilHealthScore += 15;
  } else {
    soilHealthScore += 10;
  }
  
  return {
    soilHealthScore,
    soilHealthCategory: getSoilHealthCategory(soilHealthScore),
    fertilizers,
    coverCrops,
    practices,
    recommendedCrops: crops
  };
};

// Helper function to categorize soil health score
const getSoilHealthCategory = (score) => {
  if (score >= 90) {
    return 'Excellent';
  } else if (score >= 75) {
    return 'Good';
  } else if (score >= 60) {
    return 'Moderate';
  } else if (score >= 40) {
    return 'Poor';
  } else {
    return 'Very Poor';
  }
};

// Routes
router.post('/analyze', analyzeSoilHealth);

module.exports = router;
