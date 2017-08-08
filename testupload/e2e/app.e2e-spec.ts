import { TestuploadPage } from './app.po';

describe('testupload App', () => {
  let page: TestuploadPage;

  beforeEach(() => {
    page = new TestuploadPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
