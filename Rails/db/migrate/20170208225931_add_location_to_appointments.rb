class AddLocationToAppointments < ActiveRecord::Migration[5.0]
  def up
    add_column :appointments, :location, :string, default: '174 Bank St, Ottawa, On'
  end

  def down
    add_column :appointments, :location, :string
  end
end
