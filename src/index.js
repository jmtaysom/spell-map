import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import wizard from "./wizard.json";

function SpellRow(props) {
  return (
    <div>
      <input
        type="checkbox"
        className="spell"
        id={props.spell.name}
        name={props.spell.name}
        checked={props.spell.spellbook}
        onChange={props.handleChange}
      />
      <label htmlFor={props.spell.name}>{props.spell.name}</label>
    </div>
  );
}

function SpellList(props) {
  const spells = props.spells;
  const orderedSpells = spells.sort(function(a, b) {
    return a.level - b.level;
  });
  const spellItems = orderedSpells.map(spell => (
    <SpellRow
      key={spell.name}
      spell={spell}
      handleChange={props.handleChange}
    />
  ));
  // const spellItems = spells.map(spell => (
  //   <SpellRow key={spell.key} spell={spell} handleChange={props.handleChange} />
  // ));
  return <form>{spellItems}</form>;
}

class Weave extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { spells: this.props.spells };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.name;
    const spells = this.state.spells;
    console.log(target.checked);
  }

  render() {
    return (
      <div>
        <SpellList
          spells={this.state.spells}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<Weave spells={wizard} />, document.getElementById("root"));
