"use client";
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="704009028267866" chatSupport>
          <CustomChat pageId="2150231035264148" minimized={false}/>
        </FacebookProvider>    
    );
};

export default FacebookMsg;

