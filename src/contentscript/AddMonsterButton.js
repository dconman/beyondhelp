import React, { Component } from 'react';
import StorageService from '../services/StorageService';
import MonsterData from "../data/MonsterData";

const buttonStyle = {
    display: "inline-block",
    marginRight: "20px",
    marginBottom: "20px",
    width: "200px",
    paddingTop: "8px"
}

class AddMonsterButton extends Component {
    constructor(props) {
        super(props);
        this.addMonster = this.addMonster.bind(this);
        this.buildLabel = this.buildLabel.bind(this);
    }

    addMonster() {
        const data = this.props.monsterdata;
        StorageService.createMonster(data.id, data.name, data.hp, data.thumbUrl).then(monster => {
            chrome.runtime.sendMessage({
                notificationid: monster.storageId,
                notification: {
                    type: "basic",
                    iconUrl: "icon-grey-128.png",
                    title: "Beyond Help",
                    message: `${data.name} added with ${monster.hp}HP`
                }
            });
        }).catch(e => { throw e; });
    }

    buildLabel() {
        return `Add with ${this.props.monsterdata.hp}hp`
    }

    render() {
        return <button className="button button-monsters" style={buttonStyle} onClick={this.addMonster}>{this.buildLabel()}</button>;
    }
}

export default AddMonsterButton;