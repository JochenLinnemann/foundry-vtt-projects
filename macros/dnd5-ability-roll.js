function roll(what, attr) {
  function doRoll(how) {
    const ability = token.actor.data.data.abilities[what];
    const roll = new Roll(how + " + @mod", ability);
    roll.roll();

    console.log(
      roll.total +
        " (" +
        roll.result +
        " mit Formel " +
        roll.formula +
        " und Würfeln " +
        roll.dice.map((d) => d.total).join(", ") +
        ")"
    );

    roll.toMessage({
      flavor: "...würfelt auf " + attr,
      speaker: ChatMessage.getSpeaker({ token: token }),
    });
  }

  const kindDlg = new Dialog({
    title: "Art der Probe",
    buttons: {
      adv: {
        label: "Vorteil",
        callback: () => doRoll("2d20kh"),
      },
      nrm: {
        label: "Normal",
        callback: () => doRoll("1d20"),
      },
      dis: {
        label: "Nachteil",
        callback: () => doRoll("2d20kl"),
      },
    },
  });
  kindDlg.render(true);
}

if (token) {
  const abilityDlg = new Dialog({
    title: "Attributsprobe",
    buttons: {
      str: {
        label: "Stärke",
        callback: () => roll("str", "Stärke"),
      },
      dex: {
        label: "Geschicklichkeit",
        callback: () => roll("dex", "Geschicklichkeit"),
      },
      con: {
        label: "Konstitution",
        callback: () => roll("con", "Konstitution"),
      },
      int: {
        label: "Intelligenz",
        callback: () => roll("int", "Intelligenz"),
      },
      wis: {
        label: "Weisheit",
        callback: () => roll("wis", "Weisheit"),
      },
      cha: {
        label: "Charisma",
        callback: () => roll("cha", "Charisma"),
      },
    },
  });
  abilityDlg.render(true);
}
