import React, {useEffect, useState} from "react";
import uuid from "draft-js/lib/uuid";
import {Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, convertFromRaw} from "draft-js"
import "./Note.css"

class RichEditorExample extends React.Component {
    constructor(props) {
      super(props);
      let isNoteAvailable = false


      const content = window.localStorage.getItem("notes")
      if(JSON.parse(content)[this.props.noteName]){
        isNoteAvailable = true
      }

      this.state = {editorState: isNoteAvailable ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)[this.props.noteName])) :EditorState.createEmpty(), colorCode: "blue"};

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => {
        this.props.saveToLocal(convertToRaw(editorState.getCurrentContent()), this.props.noteName)
        this.setState({editorState})};

      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
     
        return true;
      }
      return false;
    }


    _mapKeyToEditorCommand(e) {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
          
        }
        return;
      }
      return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    render() {
      const {editorState} = this.state;
      console.log(editorState)
     

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }
    
      return (
        <div className="RichEditor-root overflow-x-hidden overflow-y-hidden p-2 max-w-[400px] w-[400px] max-h-[500px]" >
             <div className="relative">
            <div className="absolute top-2 flex flex-col bg-gray-100 z-50 w-[367px] p-1">
            <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
            <div className="flex items-center justify-center text-xs font-Tilt">Color code for organization 
          <button className="w-4 h-4 ml-2 bg-blue-500" onClick={()=>{this.setState({colorCode: "blue"})}}>
          </button>
          <button className="w-4 h-4 ml-2 bg-red-500" onClick={()=>{this.setState({colorCode: "red"})}}>
          </button>
          <button className="w-4 h-4 ml-2 bg-green-500" onClick={()=>{this.setState({colorCode: "green"})}} >
          </button>
          <button className="w-4 h-4 ml-2 bg-yellow-500" onClick={()=>{this.setState({colorCode: "yellow"})}}>
          </button>
          <button className="w-4 h-4 ml-2 bg-indigo-500" onClick={()=>{this.setState({colorCode: "indigo"})}}>
          </button>
          </div>
            </div>
          </div>
        
          <div className="bg-blue-100 border-blue-500 hidden"></div>
          <div className="bg-red-100 border-red-500 hidden"></div>
          <div className="bg-green-100 border-green-500 hidden"></div>
          <div className="bg-indigo-100 border-indigo-500 hidden"></div>
          <div className="bg-yellow-100 border-yellow-500 hidden"></div>
          <div className={`${className} bg-${this.state.colorCode}-100 max-h-[400px] -z-10 pt-24 overflow-auto border-l-4 border-${this.state.colorCode}-500 p-2 `} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Writing is a great way to sort through thoughts"
              spellCheck={true}
            />
          </div>
      
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  const BLOCK_TYPES = [
    /*     {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'}, */
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];

  const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls flex p-1 font-Tilt">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            className="font-Tilt"
          />
        )}
      </div>
    );
  };

  var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    return (
      <div className="RichEditor-controls p-1 flex">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

export default RichEditorExample