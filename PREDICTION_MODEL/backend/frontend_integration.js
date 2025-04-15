// Example using modern fetch API
async function predictEmotion(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  try {
    const response = await fetch('http://your-api-url/predict-emotion/', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to predict emotion');
    }
    
    const result = await response.json();
    
    // Update UI with prediction result
    console.log(`Detected emotion: ${result.emotion} (${result.confidence})`);
    return result;
  } catch (error) {
    console.error('Error predicting emotion:', error);
    return null;
  }
}

// Example usage with a file input
document.getElementById('imageUpload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    predictEmotion(file).then(result => {
      // Update your UI with the emotion result
      if (result) {
        document.getElementById('emotionResult').textContent = 
          `Detected emotion: ${result.emotion} with ${result.confidence * 100}% confidence`;
      }
    });
  }
});
