import {React} from 'nylas-exports';
import lexrank from 'lexrank';

export default class EmailSummary extends React.Component {

  static displayName = 'EmailSummary';

  static propTypes = {
    message: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      summaryLines: 2,
      toplines: []
    }
  }

  componentDidMount() {
    this.createSummary();
  }

  createSummary() {
    lexrank.summarize(this.props.message.computePlainText(), this.state.summaryLines, (err, toplines, summary) => {
      if (err) return;
      this.setState({
        toplines: toplines
      });
    });
  }

  render() {
    return (
    <div>
      {
        this.state.toplines.length > 0 
        ? <div className="email-summary">
            <p>The top sentences of this email are:</p>
            <ul>
              {
                this.state.toplines.map((line) => {
                  return (<li>{line.text}</li>);
                })
              }
            </ul>
          </div>
        : null
      }
    </div>
    );
  }
}
