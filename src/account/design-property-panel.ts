import { FASTElement, observable, html, css, customElement, ExecutionContext } from "@microsoft/fast-element";
import { ComponentStateColorPalette, ColorRGBA64 } from "@microsoft/fast-colors";

import {
    neutralLayerL1Behavior,
    neutralLayerCardContainerBehavior,
    parseColorString,
    neutralLayerCardBehavior,
    neutralLayerFloatingBehavior,
    neutralLayerL2Behavior,
    neutralLayerL3Behavior,
    neutralLayerL4Behavior,
    accentFillRestBehavior,
    accentFillHoverBehavior
} from "@fluentui/web-components";
import { accordionIcons } from "../styles";
import { styles_headers } from "../typography";
import { styles_animation } from "../styles";
import { composedParent } from "@microsoft/fast-foundation";

function createColorPalette(baseColor: ColorRGBA64) {
    return new ComponentStateColorPalette({
        baseColor,
    }).palette.map(color => color.toStringHexRGB().toUpperCase());
}

function targetValue(ctx: ExecutionContext) {
    return (ctx.event.target! as any).value;
}

const template = html<DesignPropertyPanel>`
    <fluent-card>
        <header>
            <h2 class="properties-heading">Theme</h2>
        </header>

        <fluent-accordion class="accordion-top-in-set">
            <fluent-accordion-item expanded>
                <h3 slot="heading">Corner Radius: <b>${x => x.provider?.cornerRadius}px</b></h3>
                <svg-accordion-icons></svg-accordion-icons>
                ${accordionIcons}
                <fluent-slider
                    orientation="horizontal"
                    min="0"
                    max="16"
                    step="4"
                    :value=${x => x.provider?.cornerRadius}
                    @change=${(x, c) => (x.provider.cornerRadius = targetValue(c))}
                >
                    <fluent-slider-label position="0">0px</fluent-slider-label>
                    <fluent-slider-label position="16">16px</fluent-slider-label>
                </fluent-slider>
            </fluent-accordion-item>
        </fluent-accordion>

        <fluent-accordion class="accordion-middle-of-set">
            <fluent-accordion-item expanded>
                <h3 slot="heading">Disabled Opacity: <b>${x => x.provider?.disabledOpacity}%</b></h3>
                ${accordionIcons}
                <fluent-slider
                    orientation="horizontal"
                    min="0"
                    max="1"
                    step="0.04"
                    :value=${x => x.provider?.disabledOpacity}
                    @change=${(x, c) =>
                        (x.provider.disabledOpacity = parseFloat(targetValue(c)).toFixed(2))}
                >
                    <fluent-slider-label position="0">0%</fluent-slider-label>
                    <fluent-slider-label position="100">100%</fluent-slider-label>
                </fluent-slider>
            </fluent-accordion-item>
        </fluent-accordion>

        <fluent-accordion class="accordion-bottom-in-set">
            <fluent-accordion-item expanded>
                <h3 slot="heading">Base Layer Luminance: <b>${x => x.provider?.baseLayerLuminance}</b></h3>
                ${accordionIcons}
                <fluent-slider
                    part="slider-detail"
                    orientation="horizontal"
                    min="0"
                    max="1"
                    step="0.04"
                    :value=${x => parseFloat(x.provider?.baseLayerLuminance)}
                    @change=${(x, c) => {
                        x.provider.backgroundColor = (neutralLayerL1Behavior.value as any)({
                            ...x.provider.designSystem,
                        });
                        x.provider.baseLayerLuminance = parseFloat(targetValue(c)).toFixed(2);
                    }}
                >
                    <fluent-slider-label position="0">Dark</fluent-slider-label>
                    <fluent-slider-label position="0.24">Dusk</fluent-slider-label>
                    <fluent-slider-label position="1">Light</fluent-slider-label>
                </fluent-slider>
            </fluent-accordion-item>
        </fluent-accordion>

        <fluent-accordion>
            <fluent-accordion-item expanded>
                <h3 slot="heading">Accent Color</h3>
                ${accordionIcons}
                <input
                    type="color"
                    :value=${x => x.provider?.accentBaseColor}
                    @input=${(x, c) => {
                        x.provider.accentBaseColor = targetValue(c);
                        x.provider.accentPalette = createColorPalette(
                            parseColorString(targetValue(c))
                        );
                    }}
                />
            </fluent-accordion-item>
        </fluent-accordion>

        <fluent-accordion class="accordion-top-in-set-of-two">
            <fluent-accordion-item expanded>
                <h3 slot="heading">Design Unit</h3>
                ${accordionIcons}
                <fluent-text-field
                    class="compact-number"
                    type="number"
                    :value=${x => x.provider?.designUnit}
                    @change=${(x, c) => (x.provider.designUnit = targetValue(c))}
                ></fluent-text-field>
            </fluent-accordion-item>
        </fluent-accordion>

        <fluent-accordion class="accordion-bottom-in-set">
            <fluent-accordion-item expanded>
                <h3 slot="heading">Outline Width</h3>
                ${accordionIcons}
                <fluent-text-field
                    class="compact-number"
                    type="number"
                    :value=${x => x.provider?.outlineWidth}
                    @input=${(x, c) => (x.provider.outlineWidth = targetValue(c))}
                ></fluent-text-field>
            </fluent-accordion-item>
        </fluent-accordion>
    </fluent-card>
`;

const styles = css`
    ${styles_headers}
    ${styles_animation}

    :host {
        --section-spacing: 8px;
    }

    fluent-card {
        --card-width: 100%;
        --elevation: 0;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: ${neutralLayerL4Behavior.var};
        border-left: 1px solid var(--neutral-outline-rest);
        border-radius: 0;
        padding: 4px 8px;
        width: var(--design-property-panel-width);
        transition: var(animation-ease-in-fast);
    }

    fluent-accordion {
        background-color: ${neutralLayerCardBehavior.var};
        border: calc(var(--outline-width) * 1px) solid var(--neutral-outline-rest);
        border-radius: calc(var(--corner-radius) * 1px);
        box-shadow: 0 0.5px 0.5px 0 var(--neutral-outline-rest);
        margin-bottom: var(--section-spacing);
        padding-bottom: -1px;
        overflow: hidden;
        transition: var(animation-ease-in-fast);
    }

    fluent-accordion-item {
        border: none;
        box-sizing: border-box;
        padding: 0;
    }

    fluent-accordion-item::part(button):focus-within::before {
        border: none;
        background-color: ${neutralLayerL2Behavior.var};
    }

    fluent-accordion-item::part(heading) {
        background-color: ${neutralLayerL1Behavior.var};
    }

    fluent-accordion-item.expanded::part(region) {
        margin-bottom: 8px;
        padding: 8px 16px;
        border-top: calc(var(--outline-width) * 1px) solid var(--neutral-outline-rest)
    }

    fluent-accordion-item::part(button) {
        background-color: ${neutralLayerL1Behavior.var};
        margin: -1px 0 0;
        padding: 0 12px;
    }

    fluent-accordion-item::part(button):hover {
        color: ${accentFillHoverBehavior.var};
    }

    fluent-accordion-item > h3 {
        font-size: calc(var(--type-ramp-base-font-size) / 4 * var(--design-unit));
        font-weight: 400;
        transition: var(animation-ease-in-fast);
        user-select: none;
    }

    fluent-slider {
        margin-bottom: 28px;
    }

    fluent-slider-label {
        font-size: var(--type-ramp-minus-2-font-size);
    }

    fluent-text-field::part(root) {
        height: 40px;
        transition: var(animation-ease-in-fast);
    }

    fluent-text-field::part(control) {
        padding: 0 4px 0 12px;
    }

    header {
        background-color: ${neutralLayerL4Behavior.var};
        border-bottom: calc(var(--outline-width) * 1px) solid var(--neutral-outline-rest);
        margin: -4px -8px calc(var(--section-spacing) * 2) -8px;
        padding: 12px 16px;
        transition: var(animation-ease-in-fast);
    }

    .properties-heading {
        font-size: calc(var(--type-ramp-base-font-size) / 4 * var(--design-unit));
        user-select: none;
    }

    input[type="color"] {
        height: 36px;
        margin-top: 4px;
        padding: 0 2px;
    }

    fluent-text-field.compact-number {
        margin-top: 4px;
        width: 80px;
    }

    .accordion-top-in-set {
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }

    .accordion-top-in-set-of-two {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }

    .accordion-middle-of-set {
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }

    .accordion-bottom-in-set {
        border-top: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`
.withBehaviors (
    neutralLayerCardContainerBehavior,
    neutralLayerCardBehavior,
    neutralLayerFloatingBehavior,
    neutralLayerL1Behavior,
    neutralLayerL2Behavior,
    neutralLayerL3Behavior,
    neutralLayerL4Behavior,
    accentFillRestBehavior,
    accentFillHoverBehavior
);

function findProvider(element: HTMLElement) {
    let current = element;

    while (current) {
        if (current.tagName === 'FLUENT-DESIGN-SYSTEM-PROVIDER') {
            console.log(current);
            return current;
        }

        current = composedParent(current)!;
    }

    return null;
}

@customElement({
    name: "design-property-panel",
    template,
    styles,
})
export class DesignPropertyPanel extends FASTElement {
    @observable provider!: any;

    connectedCallback() {
        super.connectedCallback();
        this.provider = findProvider(this);
    }
}
