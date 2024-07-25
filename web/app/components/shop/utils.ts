import { LabelPrice, Product } from "@/app/types/schema";

export const _getDataAttributes = (
  currentProduct: Product,
  licenseTypeProfil: LabelPrice[],
  licenseSizeProfil: LabelPrice
) => {
  // if (!input.items || input.items.length === 0) return "";
  let dataAttributes: any = {};
  let index: number = 0;
  if (
    currentProduct &&
    currentProduct?.licenseType &&
    currentProduct?.licenseType.items
  ) {
    // console.log(currentProduct?.licenseType);
    currentProduct?.licenseType.items.forEach((item, i) => {
      index = i;
      dataAttributes[`data-item-custom${i}-placeholder`] = "Licence";
      dataAttributes[`data-item-custom${i}-name`] = item.label;
      dataAttributes[`data-item-custom${i}-type`] = "checkbox";
      // dataAttributes[`data-item-custom${i}-required`] = "true";
      dataAttributes[`data-item-custom${i}-shippable`] = "false";

      dataAttributes[
        `data-item-custom${i}-options`
      ] = `true[+${item.price}]|false`;

      if (licenseTypeProfil) {
        const exist = licenseTypeProfil.filter(
          (el: LabelPrice) => el.label === item.label
        );
        if (exist && exist.length > 0) {
          dataAttributes[`data-item-custom${i}-value`] = "true";
        } else {
          dataAttributes[`data-item-custom${i}-value`] = "false";
        }
      }
    });
  }

  if (
    currentProduct &&
    currentProduct?.licenseSize &&
    currentProduct?.licenseSize.items
  ) {
    index += 1;

    dataAttributes[`data-item-custom${index}-placeholder`] = "Company Size";
    dataAttributes[`data-item-custom${index}-name`] = "Company Size";
    // dataAttributes[`data-item-custom${index}-required`] = "true";
    dataAttributes[`data-item-custom${index}-shippable`] = "false";

    // dataAttributes[`data-item-custom${index}-type`] = "checkbox";
    const values = currentProduct?.licenseSize.items
      .map((item: LabelPrice) => {
        const price = `[+${item.price}]`;
        return `${item.label}${price}`;
      })
      .toString()
      .split(",")
      .join("|");
    dataAttributes[`data-item-custom${index}-options`] = values;
    if (licenseSizeProfil) {
      dataAttributes[`data-item-custom${index}-value`] =
        licenseSizeProfil.label;
    }
  }

  return dataAttributes;
};
