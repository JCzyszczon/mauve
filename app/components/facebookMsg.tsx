"use client";
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="704009028267866" language='pl_PL' chatSupport>
          <CustomChat pageId="2150231035264148" themeColor='#cdbebf' minimized={true}/>
        </FacebookProvider>    
    );
};

export default FacebookMsg;

