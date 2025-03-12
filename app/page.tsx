"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import CopyrightFooter from "@/components/copyright-footer";

export default function TemplateEditor() {
  const [template, setTemplate] = useState(
    "Dear [Client's Name],\n\nThe design for your Financial Assistant is complete! We'd love to schedule a short meeting to review it and ensure everything meets your expectations. Let us know a convenient time for you.\n\nLooking forward to your feedback!\n\nBest regards,\n[Your Name]"
  );
  const [placeholders, setPlaceholders] = useState<{ id: string; value: string; original: string; label: string }[]>([]);
  const [finalText, setFinalText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Safe hydration check for client-side features
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract placeholders from template
  useEffect(() => {
    const regex = /\[(.*?)\]/g;
    const matches = [...template.matchAll(regex)];
    
    const newPlaceholders = matches.map((match, index) => ({
      id: `placeholder-${index}`,
      value: "",
      original: match[0],
      label: match[1]
    }));
    
    setPlaceholders(newPlaceholders);
  }, [template]);

  // Generate final text
  useEffect(() => {
    let result = template;
    placeholders.forEach(placeholder => {
      if (placeholder.value) {
        result = result.replace(placeholder.original, placeholder.value);
      }
    });
    setFinalText(result);
  }, [template, placeholders]);

  const handlePlaceholderChange = (id: string, value: string) => {
    setPlaceholders(prev => 
      prev.map(p => p.id === id ? { ...p, value } : p)
    );
  };

  const copyToClipboard = () => {
    if (!isClient) return;
    
    navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-center">Template Editor</h1>
        <p className="text-center text-muted-foreground mb-8">
          Edit your templates with ease by filling in the bracketed fields
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Template Input and Fields */}
          <div className="space-y-6">
            <Card className="p-6 shadow-md">
              <Label htmlFor="template" className="text-lg font-medium mb-2 block">
                Your Template
              </Label>
              <Textarea
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="min-h-[200px] mb-4"
                placeholder="Enter your template with [placeholders]"
              />
              <div className="flex items-center text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Use [text] to create editable fields</span>
              </div>
            </Card>

            {placeholders.length > 0 && (
              <Card className="p-6 shadow-md">
                <h2 className="text-lg font-medium mb-4">Edit Fields</h2>
                <div className="space-y-4">
                  {placeholders.map((placeholder) => (
                    <div key={placeholder.id} className="space-y-2">
                      <Label htmlFor={placeholder.id} className="font-medium">
                        {placeholder.label}
                      </Label>
                      <Input
                        id={placeholder.id}
                        value={placeholder.value}
                        onChange={(e) => handlePlaceholderChange(placeholder.id, e.target.value)}
                        placeholder={`Enter ${placeholder.label.toLowerCase()}`}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Preview */}
          <div>
            <Card className="p-6 shadow-md h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Final Result</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className={cn(copied ? "bg-green-100 text-green-800" : "")}
                  disabled={!isClient}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="flex-grow bg-muted/30 rounded-md p-4 whitespace-pre-line">
                {finalText}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="border-t mt-auto">
        <div className="container mx-auto">
          <CopyrightFooter 
            ownerName="Shakib Al Hasan" 
            ownerLink="https://www.linkedin.com/in/shakibalhasan-code"
          />
        </div>
      </footer>
    </div>
  );
}
