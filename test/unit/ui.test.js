import UI from "../../public/ui";
import jsdom from "jsdom";
import mockUI from "../support/mockUI";

const { JSDOM } = jsdom;

describe("UI", () => {
  let dom, ui, document;
  beforeEach(()=> {
    dom = new JSDOM(mockUI);
    document = dom.window.document;
    ui = new UI(document);
  });

  it("exists", () => {
    expect(UI).toBeDefined();
  });

  it("has a valid constructor", () => {
    expect(ui).toBeDefined();
    expect(typeof ui).toBe("object");
  });

  describe("sendMessage", () => {
    let spy;
    beforeEach(() => {
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("keyup", true, true);
      evt.key = "Enter";

      spy = jest.fn();

      ui.once("sendMessage", spy);
      ui.msgInput.value = "Some text";
      ui.msgInput.dispatchEvent(evt);
    });

    it("emits 'sendMessage event'", () => {
      expect(spy).toHaveBeenCalledWith({"text": "Some text"});
    });

    it("empties msg field", () => {
      expect(ui.msg).toBe("");
    });
  });

  describe("joinChannel", () => {
    let spy;
    beforeEach(() => {
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("keyup", true, true);
      evt.key = "Enter";

      spy = jest.fn();

      ui.once("joinChannel", spy);
      ui.urlInput.value = "AAAA";
      ui.urlInput.dispatchEvent(evt);
    });

    it("emits 'joinChannel event'", () => {
      expect(spy).toHaveBeenCalledWith({"channel": "AAAA"});
    });

    it("hides url field", () => {
      expect(ui.urlInput.style.display).toBe("none");
    });

    it("hides create button", () => {
      expect(ui.create.style.display).toBe("none");
    });
  });

  describe("createChannel", () => {
    let spy;
    beforeEach(() => {
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true);

      spy = jest.fn();

      ui.once("createChannel", spy);
      ui.urlInput.value = "AAAA";
      ui.create.dispatchEvent(evt);
    });

    it("emits 'createChannel event'", () => {
      expect(spy).toHaveBeenCalledWith({"channel": ui.login});
    });

    it("hides url field", () => {
      expect(ui.urlInput.style.display).toBe("none");
    });

    it("hides create button", () => {
      expect(ui.create.style.display).toBe("none");
    });
  });
});
