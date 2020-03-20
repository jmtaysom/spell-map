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
        id={props.component + props.spellname}
        name={props.spellname}
        checked={props.spell.spellbook}
        onChange={props.handleChange}
      />
      <label htmlFor={props.component + props.spellname}>
        {props.spellname}
      </label>
    </div>
  );
}

function SpellBook(props) {
  const spells = props.spells;
  const spellList = Object.keys(spells);
  const spellBook = spellList.filter(spell => spells[spell].inSpellbook);
  const spellItems = spellBook.map((keyName, i) => (
    <SpellRow
      key={keyName}
      spell={spells[keyName]}
      spellname={keyName}
      handleChange={props.handleChange}
      component="spellBook"
    />
  ));
  return <form>{spellItems}</form>;
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
      component="spellLlist"
    />
  ));
  return <form>{spellItems}</form>;
}

function SpellMap(props) {
  const spells = props.spells;
  const spellList = Object.keys(spells);
  const filteredList = spellList.filter(spell => spells[spell].inMap);

  const sortedList = filteredList.sort(function(a, b) {
    const alevel = spells[a].level;
    const blevel = spells[b].level;
    const aschool = spells[a].school;
    const bschool = spells[b].school;
    if (alevel === blevel) {
      if (aschool < bschool) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return alevel < blevel;
    }
  });
  console.log(sortedList);
  const listItems = sortedList.map(spell => <li key={spell}>{spell}</li>);
  return <ul>{listItems}</ul>;
}

class Weave extends React.Component {
  constructor(props) {
    super(props);
    this.handleList = this.handleList.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.state = {
      spells: this.props.spells,
      nodes: {}
    };
  }

  handleList(event) {
    const target = event.target;
    const spells = this.state.spells;
    const spell = spells[target.name];
    spell.inSpellbook = !spell.inSpellbook;
    if (!spell.inSpellbook) {
      spell.inMap = false;
    }
    this.setState({ spell: spell });
  }

  handleBook(event) {
    const target = event.target;
    const spells = this.state.spells;
    const spell = spells[target.name];
    spell.inMap = !spell.inMap;
    this.setState({ spell: spell });
  }

  render() {
    return (
      <div>
        <div className="spelllist">
          <SpellList
            spells={this.state.spells}
            handleChange={this.handleList}
          />
        </div>
        <div className="spellbook">
          <SpellBook
            spells={this.state.spells}
            handleChange={this.handleBook}
          />
        </div>
        <div className="spellmap">
          <SpellMap spells={this.state.spells} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Weave spells={wizard} />, document.getElementById("root"));
