class AddHirableToCompanyPreferences < ActiveRecord::Migration[5.0]
  def up
    add_column :company_preferences, :is_hirable, :boolean, default: false, null: false
    add_index :company_preferences, :is_hirable
  end
  def down
    remove_index :company_preferences, :is_hirable
    remove_column :company_preferences, :is_hirable
  end
end
