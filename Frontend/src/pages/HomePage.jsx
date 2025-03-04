import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
    const { selectedUser } = useChatStore();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        {/* Sidebar is always visible on larger screens but hides when chat is open on mobile */}
                        {(isMobile && !selectedUser) || !isMobile ? <Sidebar /> : null}

                        {/* Chat container is only visible when a user is selected on mobile */}
                        {isMobile && selectedUser ? <ChatContainer /> : !isMobile ? (!selectedUser ? <NoChatSelected /> : <ChatContainer />) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
