import React, { useEffect } from "react";
import { Helmet } from 'react-helmet';

const Meta = ({pagetitle , discription}) => {
  useEffect(() => {    
    document.title = pagetitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const currentContent = metaDescription.getAttribute('content');
    if (metaDescription) {
      if (currentContent !== discription) {
        metaDescription.setAttribute('content', discription);
      } 
    }
  }, [discription, pagetitle]);

  return;
};

export default Meta;
