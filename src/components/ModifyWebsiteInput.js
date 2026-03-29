import React from 'react';

const ModifyWebsiteInput = ({ value, onChange, isStreaming }) => {
  return (
    <div className="modify-website-input">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe how you want to modify the website..."
        disabled={isStreaming}
        className="w-full min-h-[120px] max-h-[300px] rounded-lg border border-slate-700 bg-slate-800 text-white p-4 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-vertical shadow-md placeholder-slate-400"
      />
      {isStreaming && <p className="text-cyan-400 mt-2 text-sm">Modifying in progress...</p>}
    </div>
  );
};

export default ModifyWebsiteInput;