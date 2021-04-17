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
    it.only("emits 'sendMessage event'", () => {
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("keyup", true, true);
      evt.key = "Enter";

      let spy = jest.fn();
      ui.once("sendMessage", spy);

      ui.msgInput.dispatchEvent(evt);

      expect(spy).toHaveBeenCalledWith({"text": ""});
    });

    it("empties msg field", () => {
      ui.sendMessage({key: "Enter", target: { value: "Message" }});

      expect(ui.msg).toBe("");
    });
  });
});
