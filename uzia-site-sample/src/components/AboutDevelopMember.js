import React from 'react';
import AppContext from '../AppContext';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { CardTile } from '../components';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _map from 'lodash/map';


class AboutDevelopMember extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      developMemberArr: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  generateMemberInfos = () => {
    const memberArr = [];
    const memberInfos = this.context.developMemberDatas.data;
    console.log({ memberInfos })
    _forEach(memberInfos, (info, index) => {
      const newInfo = info;
      // const id = _get(newInfo, "id");
      const name = _get(newInfo, "name", "<No Name...>");
      const text = _get(newInfo, "text");
      const twitter = _get(newInfo, "twitter");
      const customLinks = _get(newInfo, "custom_links", []);

      const body = (
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <ButtonGroup vertical>
            {twitter && (
              <Button>Twitter</Button>
            )}
            {customLinks.length && (
              _map(customLinks, link => {
                return (
                  <Button href={link.url} >{link.site_name}</Button>
                );
              })
            )}
          </ButtonGroup>
        </Card.Body>
      );

      newInfo.content_body = body;
      newInfo.option = {
        flex: true
      };
      memberArr.push(newInfo);
    });
    return memberArr;
  }

  render() {
    return (
      <React.Fragment>
        <h2>開発メンバー</h2>
        <CardTile contentItems={this.generateMemberInfos()} contentTypeKey="member" lgThreshold={2} mdThreshold={1} />
      </React.Fragment>
    );
  }
}

export default AboutDevelopMember;