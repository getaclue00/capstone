class ChangePriceAttributeForServices < ActiveRecord::Migration[5.0]
  def up
    add_column     :services, :price, :decimal, precision: 10, scale: 2
    add_column     :services, :vehicle_size, :string, default: 'Small'
    remove_column  :services, :price_small
    remove_column  :services, :price_large
    add_index      :services, :vehicle_size
  end

  def down
    remove_column  :services, :price
    remove_column  :services, :vehicle_size
    add_column     :services, :price_small, :decimal, precision: 10, scale: 2
    add_column     :services, :price_large, :decimal, precision: 10, scale: 2
    remove_index   :services, :vehicle_size
  end
end
