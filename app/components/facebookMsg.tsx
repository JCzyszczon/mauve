"use client";
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    const app_id = process.env.NEXT_PUBLIC_APP_ID;
    const page_id = process.env.NEXT_PUBLIC_PAGE_ID;

    return (
        <FacebookProvider appId={app_id} language='pl_PL' lazy={true} chatSupport>
          <CustomChat pageId={page_id} themeColor='#cdbebf' minimized={false}/>
        </FacebookProvider>    
    );
};

export default FacebookMsg;

