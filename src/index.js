import { Root, Header, Nav, Content, Footer, presets } from './components';
import { NavHeaderEx, NavContentEx, HeaderEx, ContentForm, ContentEx, FooterEx } from './components';

import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

function App() {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState('createDefaultLayout');
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });

  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      {loading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant='h2'>Changing Preset...</Typography>
        </div>
      ) : (
          <Root config={presets[preset]()} style={{ minHeight: '100vh' }}>
            <CssBaseline />
            <Header
              menuIcon={{
                inactive: <Icon>menu_rounded</Icon>,
                active: <Icon>chevron_left</Icon>
              }}
            >
              {({ screen, classes }) => data.header && <HeaderEx screen={screen} classes={classes} />}
            </Header>
            <Nav
              collapsedIcon={{
                inactive: <Icon>chevron_left</Icon>,
                active: <Icon>chevron_right</Icon>
              }}
              header={({ collapsed }) =>
                data.nav && <NavHeaderEx collapsed={collapsed} title='First Last' subTitle='me@me.com' />
              }
            >
              {data.nav && <NavContentEx />}
            </Nav>
            <Content>
              <ContentForm
                preset={preset}
                onChangePreset={val => {
                  setLoading(true);
                  setPreset(val);
                  setTimeout(() => setLoading(false), 500);
                }}
                data={data}
                onChangeData={setData}
              />
              {data.content && <ContentEx />}
            </Content>
            <Footer>{data.footer && <FooterEx />}</Footer>
          </Root>
        )
      }
    </MuiThemeProvider>
  );
};

const root = document.getElementById('root');
root ? ReactDOM.render(<App />, root) : false;
