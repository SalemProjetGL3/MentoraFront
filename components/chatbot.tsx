"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X } from "lucide-react";
import { io } from "socket.io-client";
import ReactMarkdown from 'react-markdown';

const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export function Chatbot() {
  const chatbot_url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Bonjour ! Je suis l'assistant Mentora. Comment puis-je vous aider aujourd'hui ?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Connect to the WebSocket server
    const socketConnection = io(chatbot_url);
    setSocket(socketConnection);

    // Handle incoming messages
    socketConnection.on("response", (data: string) => {
      console.log('=== Received WebSocket Response ===');
      console.log('Raw response:', data);
      setIsLoading(false);
      try {
        // Try to parse the response as JSON
        const parsedData = JSON.parse(data);
        console.log('Parsed JSON response:', parsedData);
        setMessages((prev) => [
          ...prev,
          { text: parsedData.message || data, isUser: false },
        ]);
      } catch (error) {
        // If parsing fails, use the raw data
        console.log('Response was not JSON, using raw data');
        console.log('Error parsing JSON:', error);
        setMessages((prev) => [
          ...prev,
          { text: data, isUser: false },
        ]);
      }
      console.log('=== End of Response ===');
    });

    // Handle connection events
    socketConnection.on("connect", () => {
      console.log('Connected to WebSocket server');
    });

    socketConnection.on("disconnect", () => {
      console.log('Disconnected from WebSocket server');
    });

    socketConnection.on("error", (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      console.log('Cleaning up socket connection');
      socketConnection.disconnect(); // Clean up on unmount
    };
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    console.log('Sending message with input:', input);

    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    // Create message object with mock data
    const messageData = {
      question: input,
      lesson: "Introduction to React",
      course: "Web Development Fundamentals"
    };

    // Log the exact JSON string being sent
    const jsonString = JSON.stringify(messageData);
    console.log('Sending JSON string:', jsonString);
    console.log('JSON structure:', {
      question: messageData.question,
      lesson: messageData.lesson,
      course: messageData.course
    });

    // Send the message to the WebSocket server
    if (socket) {
      console.log('Socket connection exists, emitting message...');
      socket.emit("question", jsonString);
      console.log('Message emitted successfully');
    } else {
      console.log('No socket connection available');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <CardHeader className="bg-secondary/50 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Assistant Mentora</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.isUser ? (
                      <p className="text-sm">{message.text}</p>
                    ) : (
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-4">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                            li: ({ children }) => <li className="mb-2">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            h1: ({ children }) => <h1 className="text-xl font-bold mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-bold mb-3">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                            code: ({ children }) => <code className="bg-muted px-1 rounded">{children}</code>,
                            pre: ({ children }) => <pre className="bg-muted p-2 rounded mb-4 overflow-x-auto">{children}</pre>,
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted text-muted-foreground">
                    <LoadingDots />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Tapez votre message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg chatbot-bubble bg-gradient-to-tr from-mentora-blue to-mentora-purple"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
