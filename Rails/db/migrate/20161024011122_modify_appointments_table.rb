class ModifyAppointmentsTable < ActiveRecord::Migration[5.0]
  def up
    remove_column :appointments, :day
    remove_column :appointments, :month
    remove_column :appointments, :year
    remove_column :appointments, :start_time
    remove_column :appointments, :end_time
    add_column :appointments, :color, :string
    add_column :appointments, :text_color, :string
    add_column :appointments, :title, :string
    add_column :appointments, :start, :datetime
    add_column :appointments, :end, :datetime
    add_column :appointments, :notes, :text
  end

  def down
    add_column :appointments, :day
    add_column :appointments, :month
    add_column :appointments, :year
    add_column :appointments, :start_time
    add_column :appointments, :end_time
    remove_column :appointments, :color, :string
    remove_column :appointments, :text_color, :string
    remove_column :appointments, :title, :string
    remove_column :appointments, :start, :datetime
    remove_column :appointments, :end, :datetime
    remove_column :appointments, :notes, :text
  end
end
