import React from 'react';
import './Modes.css';

export default function Modes(props) {
  return (
    <div onChange={e => props.handleChangeMode(e.target.value)} className="mode-buttons">
      <input type="radio" name="mode" id="easy" value="6" defaultChecked />
      <label htmlFor="easy">Easy</label>
      <input type="radio" name="mode" id="medium" value="12" />
      <label htmlFor="medium">Medium</label>
      <input type="radio" name="mode" id="hard" value="20" />
      <label htmlFor="hard">Hard</label>
    </div>
  );
}
