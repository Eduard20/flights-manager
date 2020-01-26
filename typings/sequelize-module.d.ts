import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions
  };
}

declare module 'sequelize' {
  interface Model<TInstance, TAttributes, TCreationAttributes = TAttributes> extends Hooks<TInstance>, Associations {
    associations: { [key: string]: string };
    rawAttributes: TAttributes;
  }

  interface AssociationOptionsBelongsTo {
    sourceKey: string;
  }

  interface DefineIndexesOptions {
    key?: boolean;
  }
}
