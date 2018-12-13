// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DropboxIcon from '../icons/dropbox-icon';
import {getMapPermalink} from '../../utils/url';

const StyledTileWrapper = styled.div`
  display: flex;
`;

const StyledLabel = styled.div`
  font-size: 14px;
  color: ${props => props.theme.textColorLT};
  letter-spacing: 0.2px;
  text-align: center;
  ul {
    padding-left: 12px;
  }
`;

const StyledTile = styled.div`
  width: 64px;
  margin: 12px;
`;

const StyledTileMeta = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #3A414C;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin: 12px;

  .title {
    margin-bottom: 12px;
  }
`;

const TileButton = styled.button`
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
  padding: 0;
`;

export const StyledInputLabel = styled.label`
  font-size: 12px;
  color: ${props => props.theme.textColorLT};
  letter-spacing: 0.2px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.inputPadding};
  color: ${props => props.error ? 'red' : props.theme.titleColorLT};
  height: ${props => props.theme.inputBoxHeight};
  border: 0;
  outline: 0;
  font-size: 14px;
  
  :active,
  :focus,
  &.focus,
  &.active {
    outline: 0;
  }
`;

export const StyledBtn = styled.button`
  background-color: ${props => props.theme.primaryBtnActBgd};
  color: ${props => props.theme.primaryBtnActColor};
  &:focus {
    outline: none;
  }
`;

export const StyleSharingUrl = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 14px;
  flex-direction: column;
`;

const SharingUrl = ({url, message}) => (
  <StyleSharingUrl>
    <StyledInputLabel>{message}</StyledInputLabel>
    <div style={{display: 'flex'}}>
      <StyledInput type="text" value={url}/>
      <CopyToClipboard text={url}>
        <StyledBtn>copy</StyledBtn>
      </CopyToClipboard>
    </div>

  </StyleSharingUrl>
);

const dropboxLogo = (<DropboxIcon height="64px" />);

const AuthHandlerTile = ({token, onExport, onLogin, isLoading, metadata}) => {
  const showMeta = metadata && metadata.url;
  const sharingLink = metadata && metadata.url ?
    getMapPermalink(metadata.url) : null;

  return (
    <StyledTileWrapper>
      <StyledTile>
        {token ?
          (
            <div>
              <TileButton onClick={onExport}>
                {dropboxLogo}
              </TileButton>
              <StyledLabel>Upload</StyledLabel>
            </div>
          ) : (
            <div>
              <TileButton onClick={onLogin}>
                {dropboxLogo}
              </TileButton>
              <StyledLabel>Login</StyledLabel>
            </div>

          )
        }
      </StyledTile>
      <StyledTileMeta>
        {showMeta && [
          (<SharingUrl key={0} url={sharingLink} message={'Share your map with other users'}/>),
          (<SharingUrl key={1} url={metadata.url} message={'Your new saved configuration'}/>)
        ]}
      </StyledTileMeta>
    </StyledTileWrapper>

  );
};

export default AuthHandlerTile;
