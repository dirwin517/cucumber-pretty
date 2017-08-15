const { SummaryFormatter } = require('cucumber');
const { EOL } = require('os');

const LINE = EOL.repeat(2);

/**
 * Cucumber.js Pretty Formatter
 * @see https://github.com/kozhevnikov/cucumber-pretty
 */
class PrettyFormatter extends SummaryFormatter {
  /**
   * @property colorFns - a series of helper functions for outputting colors
   * @property cwd - the current working directory
   * @property eventDataCollector - an instance of EventDataCollector
   * @property log - function which will write the passed string to the the designated stream
   * @property snippetBuilder - an object with a build method that should be called with {keywordType, pickleStep}
   * @property stream - the underlying stream the formatter is writing to
   * @property supportCodeLibrary
   * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
   */
  constructor(options) {
    super(options);
    /**
     * @property eventBroadcaster - an event emitter that emits the event protocol
     * @property colorsEnabled
     */
    this.options = options;

    //* TODO
    [
      'source', 'attachment', 'gherkin-document', 'pickle', 'pickle-accepted', 'pickle-rejected',
      'test-run-started', 'test-case-prepared', 'test-case-started', 'test-step-started',
      'test-step-attachment', 'test-step-finished', 'test-case-finished', 'test-run-finished'
    ].forEach(event => {
      options.eventBroadcaster.on(event, data => {
        console.error(event/*, data*/);
      });
    });
    //*/

    options.eventBroadcaster.on('gherkin-document', data => {
      this.handleBeforeFeature(data.document.feature);
    });
  }

  handleBeforeFeature(feature) {
    const text = [
      this.formatTags(feature.tags),
      `${feature.keyword}: ${feature.name}`,
      feature.description ? EOL + feature.description : null
    ];
    this.log(text.filter(Boolean).join(EOL) + LINE);
  }

  formatTags(tags) {
    return tags.length ? this.colorFns.tag(tags.map(tag => tag.name).join(' ')) : null;
  }

  indentString(str, count) {
    return str.replace(/^/mg, ' '.repeat(count));
  }
}

module.exports = PrettyFormatter;
