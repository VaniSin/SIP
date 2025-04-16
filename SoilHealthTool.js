import React, { useState } from 'react';

const SoilHealthTool = () => {
  const [soilParams, setSoilParams] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    soilType: ''
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoilParams({
      ...soilParams,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for soil health analysis
    setTimeout(() => {
      // Generate recommendations based on soil parameters
      const soilRecommendations = generateRecommendations(soilParams);
      setRecommendations(soilRecommendations);
      setLoading(false);
    }, 1500);
  };

  const generateRecommendations = (params) => {
    // This would be replaced with actual analysis logic in production
    const { ph, nitrogen, phosphorus, potassium, organicMatter, soilType } = params;
    
    // Simple logic for demonstration
    const phValue = parseFloat(ph);
    const nValue = parseFloat(nitrogen);
    const pValue = parseFloat(phosphorus);
    const kValue = parseFloat(potassium);
    const omValue = parseFloat(organicMatter);
    
    const fertilizers = [];
    const coverCrops = [];
    const practices = [];
    
    // pH recommendations
    if (phValue < 6.0) {
      fertilizers.push('Agricultural lime to increase soil pH');
      practices.push('Apply lime at least 2-3 months before planting');
    } else if (phValue > 7.5) {
      fertilizers.push('Sulfur or gypsum to decrease soil pH');
      practices.push('Split application of acidifying amendments over time');
    }
    
    // Nitrogen recommendations
    if (nValue < 40) {
      fertilizers.push('Urea or ammonium sulfate for nitrogen deficiency');
      coverCrops.push('Legumes like clover or alfalfa to fix nitrogen');
    } else if (nValue > 80) {
      practices.push('Reduce nitrogen application, risk of leaching');
      coverCrops.push('Non-legume cover crops like rye or oats to absorb excess nitrogen');
    }
    
    // Phosphorus recommendations
    if (pValue < 20) {
      fertilizers.push('Superphosphate or rock phosphate');
      practices.push('Band application of phosphorus near plant roots');
    } else if (pValue > 50) {
      practices.push('Avoid additional phosphorus application');
      practices.push('Implement buffer strips to prevent phosphorus runoff');
    }
    
    // Potassium recommendations
    if (kValue < 150) {
      fertilizers.push('Potassium chloride or potassium sulfate');
    } else if (kValue > 300) {
      practices.push('Reduce potassium application');
    }
    
    // Organic matter recommendations
    if (omValue < 3) {
      practices.push('Add compost or well-rotted manure');
      coverCrops.push('High biomass cover crops like sorghum-sudangrass');
      practices.push('Minimize tillage to preserve soil organic matter');
    }
    
    // Soil type specific recommendations
    switch(soilType) {
      case 'sandy':
        practices.push('Frequent, light irrigation');
        practices.push('Add organic matter to improve water retention');
        break;
      case 'clay':
        practices.push('Improve drainage');
        practices.push('Add gypsum to improve soil structure');
        coverCrops.push('Deep-rooted cover crops like daikon radish to break up clay');
        break;
      case 'loam':
        practices.push('Maintain current soil structure with minimal tillage');
        break;
      case 'silt':
        practices.push('Prevent compaction by limiting traffic when wet');
        practices.push('Add organic matter to improve aggregation');
        break;
      default:
        break;
    }
    
    return {
      fertilizers,
      coverCrops,
      practices
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary text-white p-4">
        <h3 className="text-lg font-semibold">Soil Health Diagnostic Tool</h3>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">
                Soil pH (5.0-8.0)
              </label>
              <input
                type="number"
                id="ph"
                name="ph"
                min="5.0"
                max="8.0"
                step="0.1"
                value={soilParams.ph}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
                Nitrogen (ppm)
              </label>
              <input
                type="number"
                id="nitrogen"
                name="nitrogen"
                min="0"
                value={soilParams.nitrogen}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">
                Phosphorus (ppm)
              </label>
              <input
                type="number"
                id="phosphorus"
                name="phosphorus"
                min="0"
                value={soilParams.phosphorus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
                Potassium (ppm)
              </label>
              <input
                type="number"
                id="potassium"
                name="potassium"
                min="0"
                value={soilParams.potassium}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="organicMatter" className="block text-sm font-medium text-gray-700 mb-1">
                Organic Matter (%)
              </label>
              <input
                type="number"
                id="organicMatter"
                name="organicMatter"
                min="0"
                max="10"
                step="0.1"
                value={soilParams.organicMatter}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                Soil Type
              </label>
              <select
                id="soilType"
                name="soilType"
                value={soilParams.soilType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select Soil Type</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="loam">Loam</option>
                <option value="silt">Silt</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Analyze Soil Health
          </button>
        </form>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Analyzing soil parameters...</p>
          </div>
        )}

        {recommendations && (
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-md font-medium text-gray-700 mb-2">Fertilizer Recommendations:</h5>
                {recommendations.fertilizers.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-600">
                    {recommendations.fertilizers.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No specific fertilizer recommendations needed.</p>
                )}
              </div>
              
              <div>
                <h5 className="text-md font-medium text-gray-700 mb-2">Cover Crop Suggestions:</h5>
                {recommendations.coverCrops.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-600">
                    {recommendations.coverCrops.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No specific cover crop recommendations needed.</p>
                )}
              </div>
              
              <div>
                <h5 className="text-md font-medium text-gray-700 mb-2">Best Practices:</h5>
                {recommendations.practices.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-600">
                    {recommendations.practices.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No specific practice recommendations needed.</p>
                )}
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>These recommendations are for guidance only. For precise recommendations, consult with a local agricultural extension service.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilHealthTool;
