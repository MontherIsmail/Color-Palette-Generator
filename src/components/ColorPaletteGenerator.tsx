import React, { useState } from 'react';
import { FaLock, FaLockOpen, FaRedo } from 'react-icons/fa';

interface ColorBoxProps {
  color: string;
  locked: boolean;
  onToggleLock: () => void;
  onRegenerate: () => void;
  onCopy: () => void;
  copied: boolean;
}

const ColorBox: React.FC<ColorBoxProps> = ({
  color,
  locked,
  onToggleLock,
  onRegenerate,
  onCopy,
  copied,
}) => {
  return (
    <div className="relative group w-[200px] h-[200px] cursor-pointer transition-all rounded-xl overflow-hidden shadow-md">
      <div
        className="w-full h-full flex flex-col justify-between p-3 text-white font-mono text-sm"
        style={{ backgroundColor: color }}
      >
        {/* Top buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Regenerate clicked');
              onRegenerate();
            }}
            aria-label="Regenerate this color"
            className="hover:text-gray-300 transition"
            type="button"
          >
            <FaRedo />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Lock toggle clicked');
              onToggleLock();
            }}
            aria-label={locked ? 'Unlock color' : 'Lock color'}
            className="hover:text-gray-300 transition"
            type="button"
          >
            {locked ? <FaLock /> : <FaLockOpen />}
          </button>
        </div>

        {/* Bottom HEX code */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log('Copy color clicked');
            onCopy();
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer select-none"
          title="Click to copy color"
        >
          {copied ? 'Copied!' : color}
        </div>
      </div>
    </div>
  );
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface ColorItem {
  color: string;
  locked: boolean;
  copied: boolean;
}

const ColorPaletteGenerator: React.FC = () => {
  const [colors, setColors] = useState<ColorItem[]>(
    Array.from({ length: 5 }, () => ({
      color: generateRandomColor(),
      locked: false,
      copied: false,
    }))
  );

  const regeneratePalette = () => {
    setColors((prev) =>
      prev.map((item) =>
        item.locked
          ? item
          : { ...item, color: generateRandomColor(), copied: false }
      )
    );
  };

  const toggleLock = (index: number) => {
    console.log('Toggle lock for index:', index);
    setColors((prev) => {
      const newColors = [...prev];
      newColors[index] = {
        ...newColors[index],
        locked: !newColors[index].locked,
      };
      return newColors;
    });
  };

  const regenerateSingle = (index: number) => {
    setColors((prev) => {
      const newColors = [...prev];
      if (!newColors[index].locked) {
        newColors[index] = {
          ...newColors[index],
          color: generateRandomColor(),
          copied: false,
        };
      }
      return newColors;
    });
  };

  const copyColor = (index: number) => {
    navigator.clipboard.writeText(colors[index].color).then(() => {
      setColors((prev) =>
        prev.map((item, i) => ({ ...item, copied: i === index }))
      );
      setTimeout(() => {
        setColors((prev) => prev.map((item) => ({ ...item, copied: false })));
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Color Palette Generator</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {colors.map((item, index) => (
          <ColorBox
            key={index}
            color={item.color}
            locked={item.locked}
            copied={item.copied}
            onToggleLock={() => toggleLock(index)}
            onRegenerate={() => regenerateSingle(index)}
            onCopy={() => copyColor(index)}
          />
        ))}
      </div>
      <button
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
        onClick={regeneratePalette}
      >
        Generate New Palette
      </button>
    </div>
  );
};

export default ColorPaletteGenerator;
