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
        id={props.spellname}
        name={props.spellname}
        checked={props.spell.spellbook}
        onChange={props.handleChange}
      />
      <label htmlFor={props.spellname}>{props.spellname}</label>
    </div>
  );
}

function SpellList(props) {
  const spells = props.spells;
  const spellList = Object.keys(spells);
  const orderedSpells = spellList.sort(function(a, b) {
    return spells[a].level - spells[b].level;
  });
  const spellItems = orderedSpells.map((keyName, i) => (
    <SpellRow
      key={keyName}
      spell={spells[keyName]}
      spellname={keyName}
      handleChange={props.handleChange}
    />
  ));
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
    const spells = this.state.spells;
    const spell = spells[target.name];
    spell.inSpellbook = !spell.inSpellbook;
    this.setState({ spell: spell });
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
