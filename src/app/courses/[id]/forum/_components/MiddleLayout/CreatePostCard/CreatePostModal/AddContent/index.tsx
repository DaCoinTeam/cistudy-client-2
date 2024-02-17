import React from "react";
import { ButtonGroup, Card, CardFooter, Button } from "@nextui-org/react";
import {
  VariableIcon,
  PhotoIcon,
  VideoCameraIcon,
  LinkIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

interface ContentSelected = {
    
}

export const AddContent = () => {
  const items = [
    {
      key: "text",
      icon: <VariableIcon className="w-6 h-6" />,
    },
    {
      key: "link",
      icon: <LinkIcon className="w-6 h-6" />,
    },
    {
      key: "image",
      icon: <PhotoIcon className="w-6 h-6" />,
    },
    {
      key: "video",
      icon: <VideoCameraIcon className="w-6 h-6" />,
    },
    {
      key: "code",
      icon: <CodeBracketIcon className="w-6 h-6" />,
    },
  ];

  return (
    <Card className="bg-content2" shadow="none">
      <CardFooter className="w-full">
        <div>
        <ButtonGroup>
          {items.map((item) => (
            <Button className="bg-content2" isIconOnly key={item.key}>
              {item.icon}
            </Button>
          ))}
        </ButtonGroup>
        </div>
        </CardFooter>
    </Card>
  );
};
