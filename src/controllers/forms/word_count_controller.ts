import {BaseController} from "../../utilities/base_controller";
import {useEventListener} from "../../mixins/use_event_listener";

export class WordCountController extends BaseController {

  static targets = ["input", "output"];
  static values = {min: Number, max: Number};
  static classes = ["error"];

  declare readonly inputTarget: HTMLInputElement | HTMLTextAreaElement;
  declare readonly outputTarget: HTMLElement;
  declare minValue: number;
  declare hasMinValue: boolean;
  declare maxValue: number;
  declare hasMaxValue: boolean;

  declare readonly errorClass: string;
  declare readonly hasErrorClass: boolean;

  get _errorClasses(): string[] {
    return this.errorClass.split(' ');
  }

  get _defaultErrorClasses(): string[] {
    return [];
  }

  connect() {
    this._updateWordCount();
    useEventListener(this, this.inputTarget, "input", this._updateWordCount);
  }

  _updateWordCount() {
    let wordCount = 0;
    let textAreaValue = this.inputTarget.value;
    let matches = textAreaValue.match(/\S+/g);
    wordCount = (matches && matches.length) || 0;
    this.outputTarget.innerText = wordCount.toString();
    if (this.hasErrorClass) {
      if (this._isValidCount(wordCount)) {
        this._removeErrorClasses(this.outputTarget);
      } else {
        this._addErrorClasses(this.outputTarget);
      }
    }
  }

  private _addErrorClasses(el: HTMLElement = this.el) {
    if (this.hasErrorClass) {
      el.classList.add(...this._errorClasses);
    } else {
      el.classList.add(...this._defaultErrorClasses);
    }
  }

  private _removeErrorClasses(el: HTMLElement = this.el) {
    if (this.hasErrorClass) {
      el.classList.remove(...this._errorClasses);
    } else {
      el.classList.remove(...this._defaultErrorClasses);
    }
  }

  private _isValidCount(count: number) {
    let min = 0;
    let max = 99999;

    if (this.hasMinValue) {
      min = this.minValue;
    }

    if (this.hasMaxValue) {
      max = this.maxValue;
    }

    return count >= min && count <= max;
  }

}
