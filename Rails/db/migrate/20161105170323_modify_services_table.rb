class ModifyServicesTable < ActiveRecord::Migration[5.0]
  def up
    add_column :services, :active, :boolean, :default => true
    change_column_null :services, :active, false

    add_column :services, :displayable, :boolean, :default => true
    change_column_null :services, :displayable, false
  end

  def down
    remove_column :services, :active, :boolean, :default => true
    remove_column :services, :displayable, :boolean, :default => true
  end
end
