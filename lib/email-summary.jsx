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
      content: '',
      summaryLines: 1
    }
  }

  componentDidMount() {
    this.createSummary();
  }

  createSummary() {
    lexrank.summarize(this.props.message.computePlainText(), this.state.summaryLines, (err, toplines, summary) => {
      if (err) return;
      this.setState({content: summary});
    });
  }

  increaseSummary() {
    this.setState({
      summaryLines: this.state.summaryLines++
    })
    this.createSummary();

  }

  render() {
    return (
      <div className="email-summary">
        {this.state.content}

        <a onClick={this.increaseSummary}>more...</a>
      </div>
    );
  }
}
