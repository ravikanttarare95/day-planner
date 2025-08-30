import React from "react";

function Button({ btnTitle, customStyle, onBtnClick }) {
  return (
    <button
      className={`mt-6 px-5 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition cursor-pointer ${customStyle}`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
