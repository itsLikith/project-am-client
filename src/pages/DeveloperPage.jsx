import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/developers.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error('Error loading HTML file:', error));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MyComponent;
